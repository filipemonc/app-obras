<?php
session_start();

if (isset($_SESSION["logged"]) && is_array($_SESSION["logged"])) {
    require("conexao.php");

    class SalvaArquivo
    {
        public function verifica_extensao($name)
        {
            $extension = end(explode('.', $name));
            return $extension;
        }

        public function salva_nota_fiscal($tmp_name, $new_name)
        {
            $file_path = "../notas-fiscais/";
            move_uploaded_file($tmp_name, $file_path . $new_name . ".pdf");
        }

        public function salva_arquivo($tmp_name, $new_name)
        {
            $file_path = "../arquivos/";
            move_uploaded_file($tmp_name, $file_path . $new_name);
        }
    }

    class Arquivos extends SalvaArquivo
    {
        private $con = null;
        public function __construct($conexao)
        {
            $this->con = $conexao;
        }

        public function send()
        {
            $action = $_POST["action"];
            $nome = $_POST["nome"];
            $valor = $_POST["valor"];
            $arquivo = $_FILES["arquivo"];
            $obra_ID = $_POST["obra_ID"];
            if (empty($action) || empty($nome) || empty($valor) || empty($arquivo) || $this->con == null) {
                echo json_encode(array("cod" => 1, "mensagem" => "Ocorreu um erro interno no servidor."));
                return;
            }
            switch (true) {
                case ($action == "adiciona_nota_fiscal_pdf"):
                    echo $this->adiciona_nota_fiscal_pdf($nome, $valor, $arquivo, $_SESSION["logged"][0], $obra_ID);
                    break;
                case ($action == "adiciona_arquivo"):
                    echo $this->adiciona_arquivo($nome, $valor, $arquivo, $_SESSION["logged"][0], $obra_ID);
                    break;
            }
        }

        public function adiciona_nota_fiscal_pdf($nome, $valor, $arquivo, $usuario_ID, $obra_ID)
        {
            $conexao = $this->con;

            $geraNomeArquivo = function () use (&$geraNomeArquivo, $conexao) {
                $length = 16;
                $a = str_split("abcdefghijklmnopqrstuvwxyz0123456789");
                $b = array();

                for ($i = 0; $i < $length; $i++) {
                    $r = rand(0, (sizeof($a) - 1));
                    $b[$i] = $a[$r];
                }
                $nome_arquivo = join("", $b);

                $query = $conexao->prepare("SELECT arquivo FROM notas_fiscais WHERE arquivo = ?");
                $query->execute(array($nome_arquivo));

                if ($query->rowCount() > 0) {
                    return $geraNomeArquivo();
                } else {
                    return $nome_arquivo;
                }
            };
            $nome_arquivo = $geraNomeArquivo();

            $query = $conexao->prepare("INSERT INTO notas_fiscais (nome, valor, arquivo, usuario_ID, obra_ID) VALUES (?, ?, ?, ?, ?)");
            if ($query->execute(array($nome, $valor, $nome_arquivo, $usuario_ID, $obra_ID))) {
                $this->salva_nota_fiscal($arquivo["tmp_name"], $nome_arquivo);
                return json_encode(array("cod" => 0));
            } else {
                return json_encode(array("cod" => 1, "mensagem" => "Erro ao cadastrar nota fiscal. Tente novamente."));
            }
        }

        public function adiciona_arquivo($nome, $valor, $arquivo, $usuario_ID, $obra_ID)
        {
            $conexao = $this->con;

            $extensao = $this->verifica_extensao($arquivo["name"]);

            $geraNomeArquivo = function () use (&$geraNomeArquivo, $conexao, $extensao) {
                $length = 16;
                $a = str_split("abcdefghijklmnopqrstuvwxyz0123456789");
                $b = array();

                for ($i = 0; $i < $length; $i++) {
                    $r = rand(0, (sizeof($a) - 1));
                    $b[$i] = $a[$r];
                }
                $nome_arquivo = join("", $b);

                $query = $conexao->prepare("SELECT arquivo FROM arquivos WHERE arquivo = ?");
                $query->execute(array($nome_arquivo . "." . $extensao));

                if ($query->rowCount() > 0) {
                    return $geraNomeArquivo();
                } else {
                    return $nome_arquivo . "." . $extensao;
                }
            };
            $nome_arquivo = $geraNomeArquivo();

            $query = $conexao->prepare("INSERT INTO arquivos (nome, arquivo, tipo, usuario_ID, obra_ID) VALUES (?, ?, ?, ?, ?)");
            if ($query->execute(array($nome, $nome_arquivo, $valor, $usuario_ID, $obra_ID))) {
                $this->salva_arquivo($arquivo["tmp_name"], $nome_arquivo);
                return json_encode(array("cod" => 0));
            } else {
                return json_encode(array("cod" => 1, "mensagem" => "Erro ao cadastrar nota fiscal. Tente novamente."));
            }
        }
    };
    $conexao = new Conexao();
    $classe = new Arquivos($conexao->conectar());
    $classe->send();
} else {
    header("HTTP/1.1 401 Unauthorized");
    exit;
}
