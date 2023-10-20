<!-- Este é um arquivo de exemplo -->

<?php
class Conexao {
        private $server = "";
        private $user = "";
        private $password = "";
        private $db = "";

        public function conectar()
        {
            try {
                $conexao = new PDO("mysql:host=$this->server;dbname=$this->db;charset=utf8", $this->user, $this->password);
                $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $erro) {
                $conexao = null;
            }
            return $conexao;
        }
    };
?>