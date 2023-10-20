<?php
    require("conexao.php");

    Class Acesso {
        private $con = null;
        public function __construct($conexao) {
            $this->con = $conexao;
        }

        public function send() {
            $method = filter_input(INPUT_SERVER, 'REQUEST_METHOD', FILTER_SANITIZE_STRING);
            $data = json_decode(file_get_contents('php://input'));
            if(empty($data) || $this->con == null) {
                echo json_encode(array("cod" => 1, "mensagem" => "Ocorreu um erro interno no servidor."));
                return;
            }
            switch(true){
                case ($data->action == "login"):
                    echo $this->login($data->matricula, $data->senha);
                    break;
            }
        }

        public function login($matricula, $senha) {
            $conexao = $this->con;
            $query = $conexao->prepare("SELECT ID, nome, sobrenome, senha, papel, status FROM usuarios WHERE matricula = ?");
            $query->execute(array($matricula));
    
            if($query->rowCount()){
                $user = $query->fetchAll(PDO::FETCH_ASSOC)[0];
                if($user["status"]){
                    if($user["senha"] == sha1($senha)){
                        session_start();
                        $_SESSION["logged"] = array($user["ID"], $user["papel"], $user["nome"], $user["sobrenome"], $matricula);
                        return json_encode(array("cod" => 0));
                    }else{
                        return json_encode(array("cod" => 1, "mensagem" => "Matrícula e/ou senha incorretas."));
                    }
                }else{
                    return json_encode(array("cod" => 1, "mensagem" => "Este usuário está com acesso bloqueado ao sistema. Entre em contato com o setor responsável para maiores informações."));
                }
            }else{
                return json_encode(array("cod" => 1, "mensagem" => "Matrícula e/ou senha incorretas."));
            }
        }

    };

    $conexao = new Conexao();
    $classe = new Acesso($conexao->conectar());
    $classe->send();
?>