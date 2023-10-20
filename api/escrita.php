<?php
session_start();

if (isset($_SESSION["logged"]) && is_array($_SESSION["logged"])) {
    require("conexao.php");

    class SalvaImagem
    {

        public function excluiArquivo($arquivo)
        {
            $file_path = "../arquivos/";
            unlink($file_path . $arquivo);

            return true;
        }

        public function excluiNotaFiscal($arquivo)
        {
            $file_path = "../notas-fiscais/";
            unlink($file_path . $arquivo . ".pdf");

            return true;
        }

        public function excluiImagem($arquivo, $tipo, $utilizacao)
        {
            $file_path = "../img-" . $utilizacao . "/";
            unlink($file_path . $arquivo . "-" . $tipo . ".jpeg");

            return true;
        }

        public function convertePDF($foto, $arquivo)
        {
            $file_path = "../notas-fiscais/";

            $data = explode(',', $foto);

            $img = base64_decode($data[1]);

            $pdf = new Imagick();
            $pdf->readImageBlob($img);
            $pdf->setImageFormat("pdf");
            $pdf->writeImages($file_path . $arquivo . ".pdf", true);

            return true;
        }

        public function geraImagem($foto, $arquivo, $tipo, $utilizacao)
        {
            $file_path = "../img-" . $utilizacao . "/";

            $data = explode(',', $foto);

            $img = imagecreatefromstring(base64_decode($data[1]));

            $width = imagesx($img);
            $height = imagesy($img);

            $r = $width / $height;

            if ($tipo == "thumb") {
                $q = 80;
                $w = 500;
                $h = 500;

                if ($width > $height) {
                    $width = ceil($width - ($width * abs($r - $w / $h)));
                } else {
                    $height = ceil($height - ($height * abs($r - $w / $h)));
                }
                $newwidth = $w;
                $newheight = $h;
            }
            if ($tipo == "full") {
                $q = 90;
                $w = 2000;
                $h = 2000;

                if ($w / $h > $r) {
                    $newwidth = $h * $r;
                    $newheight = $h;
                } else {
                    $newheight = $w / $r;
                    $newwidth = $w;
                }
            }

            $img_final = imagecreatetruecolor($newwidth, $newheight);
            imagecopyresampled($img_final, $img, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

            imagejpeg($img_final, $file_path . $arquivo . "-" . $tipo . ".jpeg", $q);

            imagedestroy($img);

            imagedestroy($img_final);

            return true;
        }
    }

    class Escrita extends SalvaImagem
    {
        private $con = null;
        public function __construct($conexao)
        {
            $this->con = $conexao;
        }

        public function send()
        {
            $method = filter_input(INPUT_SERVER, 'REQUEST_METHOD', FILTER_SANITIZE_STRING);
            $data = json_decode(file_get_contents('php://input'));
            if (empty($data) || $this->con == null) {
                echo json_encode(array("cod" => 1, "mensagem" => "Ocorreu um erro interno no servidor."));
                return;
            }
            switch (true) {
                case ($data->action == "cadastra_obra"):
                    echo $this->cadastra_obra($data->nome, $data->responsavel, $data->responsavel_tecnico, $data->inicio, $data->termino, $data->endereco, $data->foto);
                    break;
                case ($data->action == "edita_obra"):
                    echo $this->edita_obra($data->id, $data->nome, $data->responsavel, $data->responsavel_tecnico, $data->inicio, $data->termino, $data->endereco, $data->status, $data->foto);
                    break;
                case ($data->action == "adiciona_checklist"):
                    echo $this->adiciona_checklist($data->data, $data->texto, $_SESSION["logged"][0], $data->obra_ID);
                    break;
                case ($data->action == "conclui_checklist"):
                    echo $this->conclui_checklist($data->checklist_ID);
                    break;
                case ($data->action == "exclui_checklist"):
                    echo $this->exclui_checklist($data->checklist_ID);
                    break;
                case ($data->action == "adiciona_pendencia"):
                    echo $this->adiciona_pendencia($data->texto, $_SESSION["logged"][0], $data->checklist_ID, $data->obra_ID);
                    break;
                case ($data->action == "adiciona_atualizacao"):
                    echo $this->adiciona_atualizacao($data->atividades, $data->ocorrencias, $data->condicao_tempo, $_SESSION["logged"][0], $data->obra_ID, $data->fotos);
                    break;
                case ($data->action == "exclui_atualizacao"):
                    echo $this->exclui_atualizacao($data->atualizacao_ID);
                    break;
                case ($data->action == "adiciona_nota_fiscal_imagem"):
                    echo $this->adiciona_nota_fiscal_imagem($data->nome, $data->valor, $_SESSION["logged"][0], $data->obra_ID, $data->foto);
                    break;
                case ($data->action == "exclui_nota_fiscal"):
                    echo $this->exclui_nota_fiscal($data->nota_fiscal_ID);
                    break;
                case ($data->action == "cadastra_efetivo"):
                    echo $this->cadastra_efetivo($data->funcao, $data->empreiteira, $data->quantidade, $_SESSION["logged"][0], $data->obra_ID);
                    break;
                case ($data->action == "exclui_efetivo"):
                    echo $this->exclui_efetivo($data->efetivo_ID);
                    break;
                case ($data->action == "exclui_arquivo"):
                    echo $this->exclui_arquivo($data->arquivo_ID);
                    break;
                case ($data->action == "adiciona_inventario"):
                    echo $this->adiciona_inventario($data->nome, $data->local, $data->quantidade, $data->tipo, $_SESSION["logged"][0], $data->obra_ID);
                    break;
                case ($data->action == "exclui_inventario"):
                    echo $this->exclui_inventario($data->inventario_ID);
                    break;
                case ($data->action == "cadastra_usuario"):
                    echo $this->cadastra_usuario($data->nome, $data->sobrenome, $data->matricula, $data->senha, $data->funcao, $data->num_conselho, $data->telefone, $data->email, $data->foto);
                    break;
                case ($data->action == "edita_usuario"):
                    echo $this->edita_usuario($data->id, $data->nome, $data->sobrenome, $data->matricula, $data->senha, $data->funcao, $data->num_conselho, $data->telefone, $data->email, $data->foto);
                    break;
                case ($data->action == "edita_senha"):
                    echo $this->edita_senha($data->id, $_SESSION["logged"][0], $data->senha_atual, $data->nova_senha);
                    break;
            }
        }

        public function cadastra_obra($nome, $responsavel, $reponsavel_tecnico, $inicio, $termino, $endereco, $foto)
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

                $query = $conexao->prepare("SELECT foto FROM obras WHERE foto = ?");
                $query->execute(array($nome_arquivo));

                if ($query->rowCount() > 0) {
                    return $geraNomeArquivo();
                } else {
                    return $nome_arquivo;
                }
            };
            if ($foto != "") {
                $nome_arquivo = $geraNomeArquivo();
            } else {
                $nome_arquivo = "";
            }


            $query = $conexao->prepare("INSERT INTO obras (nome, responsavel_ID, responsavel_tecnico_ID, inicio, termino, endereco, foto) VALUES (?, ?, ?, ?, ?, ?, ?)");
            if ($query->execute(array($nome, $responsavel, $reponsavel_tecnico, $inicio, $termino, $endereco, $nome_arquivo))) {
                if ($foto != "") {
                    $this->geraImagem($foto, $nome_arquivo, "thumb", "obras");
                }
                return json_encode(array("cod" => 0));
            } else {
                return json_encode(array("cod" => 1, "mensagem" => "Erro ao cadastrar obra. Tente novamente."));
            }
        }

        public function edita_obra($id, $nome, $responsavel, $reponsavel_tecnico, $inicio, $termino, $endereco, $status, $foto)
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

                $query = $conexao->prepare("SELECT foto FROM obras WHERE foto = ?");
                $query->execute(array($nome_arquivo));

                if ($query->rowCount() > 0) {
                    return $geraNomeArquivo();
                } else {
                    return $nome_arquivo;
                }
            };

            $query = $conexao->prepare("SELECT foto FROM obras WHERE ID = ?");
            $query->execute(array($id));
            $result = $query->fetchAll(PDO::FETCH_ASSOC)[0]["foto"];
            if ($result == "") {
                if ($foto != "") {
                    $nome_arquivo = $geraNomeArquivo();
                } else {
                    $nome_arquivo = "";
                }
            } else {
                $nome_arquivo = $result;
            }

            $query = $conexao->prepare("UPDATE obras SET nome = ?, responsavel_ID = ?, responsavel_tecnico_ID = ?, inicio = ?, termino = ?, endereco = ?, status = ?, foto = ? WHERE ID = ?");
            if ($query->execute(array($nome, $responsavel, $reponsavel_tecnico, $inicio, $termino, $endereco, $status, $nome_arquivo, $id))) {
                if ($foto != "") {
                    $this->geraImagem($foto, $nome_arquivo, "thumb", "obras");
                }
                return json_encode(array("cod" => 0));
            } else {
                return json_encode(array("cod" => 1, "mensagem" => "Erro ao atualizar obra. Tente novamente."));
            }
        }

        public function adiciona_checklist($data, $texto, $usuario_ID, $obra_ID)
        {
            $conexao = $this->con;
            $query = $conexao->prepare("INSERT INTO checklist (data, texto, usuario_ID, obra_ID) VALUES (?, ?, ?, ?)");
            if ($query->execute(array($data, $texto, $usuario_ID, $obra_ID))) {
                return json_encode(array("cod" => 0));
            } else {
                return json_encode(array("cod" => 1, "mensagem" => "Erro ao cadastrar checklist. Tente novamente."));
            }
        }

        public function conclui_checklist($id)
        {
            $conexao = $this->con;
            $query = $conexao->prepare("UPDATE checklist SET status = ? WHERE ID = ?");
            if ($query->execute(array("concluido", $id))) {
                return json_encode(array("cod" => 0));
            } else {
                return json_encode(array("cod" => 1, "mensagem" => "Erro ao concluir checklist. Tente novamente."));
            }
        }

        public function exclui_checklist($id)
        {
            $conexao = $this->con;
            $query = $conexao->prepare("DELETE FROM pendencias WHERE checklist_ID = ?");
            if ($query->execute(array($id))) {
                $query = $conexao->prepare("DELETE FROM checklist WHERE ID = ?");
                if ($query->execute(array($id))) {
                    return json_encode(array("cod" => 0));
                } else {
                    return json_encode(array("cod" => 1, "mensagem" => "Erro ao excluir checklist. Tente novamente."));
                }
            } else {
                return json_encode(array("cod" => 1, "mensagem" => "Erro ao excluir checklist. Tente novamente."));
            }
        }

        public function adiciona_pendencia($texto, $usuario_ID, $checklist_ID, $obra_ID)
        {
            $conexao = $this->con;
            $query = $conexao->prepare("INSERT INTO pendencias (data, texto, usuario_ID, checklist_ID, obra_ID) VALUES (?, ?, ?, ?, ?)");
            if ($query->execute(array(date('Y-m-d'), $texto, $usuario_ID, $checklist_ID, $obra_ID))) {
                return json_encode(array("cod" => 0));
            } else {
                return json_encode(array("cod" => 1, "mensagem" => "Erro ao cadastrar pendência. Tente novamente."));
            }
        }

        public function adiciona_atualizacao($atividades, $ocorrencias, $condicao_tempo, $usuario_ID, $obra_ID, $fotos)
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

                $query = $conexao->prepare("SELECT nome FROM diario_fotos WHERE nome = ?");
                $query->execute(array($nome_arquivo));

                if ($query->rowCount() > 0) {
                    return $geraNomeArquivo();
                } else {
                    return $nome_arquivo;
                }
            };
            $query = $conexao->prepare("INSERT INTO diario (data, atividades, ocorrencias, condicao_tempo, usuario_ID, obra_ID) VALUES (?, ?, ?, ?, ?, ?)");
            if ($query->execute(array(date('Y-m-d'), $atividades, $ocorrencias, $condicao_tempo, $usuario_ID, $obra_ID))) {
                $query = $conexao->prepare("SELECT ID FROM diario WHERE data = ? AND atividades = ? AND ocorrencias = ? AND condicao_tempo = ? AND usuario_ID = ? AND obra_ID = ?");
                $query->execute(array(date('Y-m-d'), $atividades, $ocorrencias, $condicao_tempo, $usuario_ID, $obra_ID));
                $diario_ID = $query->fetchAll(PDO::FETCH_ASSOC)[0]["ID"];
                foreach ($fotos as &$foto) {
                    $nome_arquivo = $geraNomeArquivo();
                    $query = $conexao->prepare("INSERT INTO diario_fotos (nome, diario_ID) VALUES (?, ?)");
                    if ($query->execute(array($nome_arquivo, $diario_ID))) {
                        $this->geraImagem($foto, $nome_arquivo, "full", "diario");
                        $this->geraImagem($foto, $nome_arquivo, "thumb", "diario");
                    } else {
                        return json_encode(array("cod" => 1, "mensagem" => "Erro ao cadastrar atualização. Tente novamente."));
                    }
                }
                return json_encode(array("cod" => 0));
            } else {
                return json_encode(array("cod" => 1, "mensagem" => "Erro ao cadastrar atualização. Tente novamente."));
            }
        }

        public function exclui_atualizacao($id)
        {
            $conexao = $this->con;
            $query = $conexao->prepare("SELECT nome FROM diario_fotos WHERE diario_ID = ?");
            $query->execute(array($id));
            $result = $query->fetchAll(PDO::FETCH_ASSOC);
            foreach ($result as &$foto) {
                $this->excluiImagem($foto["nome"], "full", "diario");
                $this->excluiImagem($foto["nome"], "thumb", "diario");
            }
            $query = $conexao->prepare("DELETE FROM diario_fotos WHERE diario_ID = ?");
            if ($query->execute(array($id))) {
                $query = $conexao->prepare("DELETE FROM diario WHERE ID = ?");
                if ($query->execute(array($id))) {
                    return json_encode(array("cod" => 0));
                } else {
                    return json_encode(array("cod" => 1, "mensagem" => "Erro ao excluir atualização. Tente novamente."));
                }
            } else {
                return json_encode(array("cod" => 1, "mensagem" => "Erro ao excluir atualização. Tente novamente."));
            }
        }

        public function adiciona_nota_fiscal_imagem($nome, $valor, $usuario_ID, $obra_ID, $foto)
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
                $this->convertePDF($foto, $nome_arquivo);
                return json_encode(array("cod" => 0));
            } else {
                return json_encode(array("cod" => 1, "mensagem" => "Erro ao cadastrar nota fiscal. Tente novamente."));
            }
        }

        public function exclui_nota_fiscal($id)
        {
            $conexao = $this->con;
            $query = $conexao->prepare("SELECT arquivo FROM notas_fiscais WHERE ID = ?");
            $query->execute(array($id));
            $nome_arquivo = $query->fetchAll(PDO::FETCH_ASSOC)[0]["arquivo"];
            $query = $conexao->prepare("DELETE FROM notas_fiscais WHERE ID = ?");
            if ($query->execute(array($id))) {
                $this->excluiNotaFiscal($nome_arquivo);
                return json_encode(array("cod" => 0));
            } else {
                return json_encode(array("cod" => 1, "mensagem" => "Erro ao excluir nota fiscal. Tente novamente."));
            }
        }

        public function cadastra_efetivo($funcao, $empreiteira, $quantidade, $usuario_ID, $obra_ID)
        {
            $conexao = $this->con;
            $query = $conexao->prepare("INSERT INTO efetivo (data, funcao, empreiteira, quantidade, usuario_ID, obra_ID) VALUES (?, ?, ?, ?, ?, ?)");
            if ($query->execute(array(date('Y-m-d'), $funcao, $empreiteira, $quantidade, $usuario_ID, $obra_ID))) {
                return json_encode(array("cod" => 0));
            } else {
                return json_encode(array("cod" => 1, "mensagem" => "Erro ao cadastrar efetivo. Tente novamente."));
            }
        }

        public function exclui_efetivo($id)
        {
            $conexao = $this->con;
            $query = $conexao->prepare("DELETE FROM efetivo WHERE ID = ?");
            if ($query->execute(array($id))) {
                return json_encode(array("cod" => 0));
            } else {
                return json_encode(array("cod" => 1, "mensagem" => "Erro ao excluir efetivo. Tente novamente."));
            }
        }

        public function exclui_arquivo($id)
        {
            $conexao = $this->con;
            $query = $conexao->prepare("SELECT arquivo FROM arquivos WHERE ID = ?");
            $query->execute(array($id));
            $nome_arquivo = $query->fetchAll(PDO::FETCH_ASSOC)[0]["arquivo"];
            $query = $conexao->prepare("DELETE FROM arquivos WHERE ID = ?");
            if ($query->execute(array($id))) {
                $this->excluiArquivo($nome_arquivo);
                return json_encode(array("cod" => 0));
            } else {
                return json_encode(array("cod" => 1, "mensagem" => "Erro ao excluir arquivo. Tente novamente."));
            }
        }

        public function adiciona_inventario($nome, $local, $quantidade, $tipo, $usuario_ID, $obra_ID)
        {
            $conexao = $this->con;
            $query = $conexao->prepare("INSERT INTO inventario (nome, local, quantidade, tipo, usuario_ID, obra_ID) VALUES (?, ?, ?, ?, ?, ?)");
            if ($query->execute(array($nome, $local, $quantidade, $tipo, $usuario_ID, $obra_ID))) {
                return json_encode(array("cod" => 0));
            } else {
                return json_encode(array("cod" => 1, "mensagem" => "Erro ao cadastrar inventário. Tente novamente."));
            }
        }

        public function exclui_inventario($id)
        {
            $conexao = $this->con;
            $query = $conexao->prepare("DELETE FROM inventario WHERE ID = ?");
            if ($query->execute(array($id))) {
                return json_encode(array("cod" => 0));
            } else {
                return json_encode(array("cod" => 1, "mensagem" => "Erro ao excluir inventário. Tente novamente."));
            }
        }

        public function cadastra_usuario($nome, $sobrenome, $matricula, $senha, $funcao, $num_conselho, $telefone, $email, $foto)
        {
            $conexao = $this->con;
            if ($foto != "") {
                $nome_arquivo = $matricula . "-thumb";
            } else {
                $nome_arquivo = "";
            }
            $query = $conexao->prepare("SELECT ID FROM usuarios WHERE matricula = ?");
            $query->execute(array($matricula));
            if ($query->rowCount()) {
                return json_encode(array("cod" => 1, "mensagem" => "Esta matrícula já está associada a um colaborador."));
            }
            $query = $conexao->prepare("SELECT ID FROM usuarios WHERE email = ?");
            $query->execute(array($email));
            if ($query->rowCount()) {
                return json_encode(array("cod" => 1, "mensagem" => "Este e-mail já está associado a um colaborador."));
            }
            $query = $conexao->prepare("INSERT INTO usuarios (nome, sobrenome, matricula, senha, funcao, num_conselho, telefone, email, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            if ($query->execute(array($nome, $sobrenome, $matricula, sha1($senha), $funcao, $num_conselho, $telefone, $email, $nome_arquivo))) {
                if ($foto != "") {
                    $this->geraImagem($foto, $matricula, "thumb", "usuarios");
                }
                return json_encode(array("cod" => 0));
            } else {
                return json_encode(array("cod" => 1, "mensagem" => "Erro ao cadastrar usuário. Tente novamente."));
            }
        }

        public function edita_usuario($id, $nome, $sobrenome, $matricula, $senha, $funcao, $num_conselho, $telefone, $email, $foto)
        {
            $conexao = $this->con;
            $query = $conexao->prepare("SELECT foto FROM usuarios WHERE ID = ?");
            $query->execute(array($id));
            $result = $query->fetchAll(PDO::FETCH_ASSOC)[0]["foto"];
            if ($result == "") {
                if ($foto != "") {
                    $nome_arquivo = $matricula . "-thumb";
                } else {
                    $nome_arquivo = "";
                }
            } else {
                $nome_arquivo = $result;
            }
            $query = $conexao->prepare("SELECT ID FROM usuarios WHERE email = ? AND ID != ?");
            $query->execute(array($email, $id));
            if ($query->rowCount()) {
                return json_encode(array("cod" => 1, "mensagem" => "Este e-mail já está associado a um colaborador."));
            }
            if ($senha == "") {
                $query = $conexao->prepare("UPDATE usuarios SET nome = ?, sobrenome = ?, funcao = ?, num_conselho = ?, telefone = ?, email = ?, foto = ? WHERE ID = ?");
                if ($query->execute(array($nome, $sobrenome, $funcao, $num_conselho, $telefone, $email, $nome_arquivo, $id))) {
                    if ($foto != "") {
                        $this->geraImagem($foto, $matricula, "thumb", "usuarios");
                    }
                    return json_encode(array("cod" => 0));
                } else {
                    return json_encode(array("cod" => 1, "mensagem" => "Erro ao atualizar usuário. Tente novamente."));
                }
            } else {
                $query = $conexao->prepare("UPDATE usuarios SET nome = ?, sobrenome = ?, senha = ?, funcao = ?, num_conselho = ?, telefone = ?, email = ?, foto = ? WHERE ID = ?");
                if ($query->execute(array($nome, $sobrenome, sha1($senha), $funcao, $num_conselho, $telefone, $email, $nome_arquivo, $id))) {
                    if ($foto != "") {
                        $this->geraImagem($foto, $matricula, "thumb", "usuarios");
                    }
                    return json_encode(array("cod" => 0));
                } else {
                    return json_encode(array("cod" => 1, "mensagem" => "Erro ao atualizar usuário. Tente novamente."));
                }
            }
        }
        public function edita_senha($id, $usuario_ID, $senha_atual, $nova_senha)
        {
            $conexao = $this->con;
            if ($id == $usuario_ID) {
                $query = $conexao->prepare("SELECT senha FROM usuarios WHERE ID = ?");
                $query->execute(array($id));
                $result = $query->fetchAll(PDO::FETCH_ASSOC)[0]["senha"];
                if ($result == sha1($senha_atual)) {
                    $query = $conexao->prepare("UPDATE usuarios SET senha = ? WHERE ID = ?");
                    if ($query->execute(array(sha1($nova_senha), $id))) {
                        return json_encode(array("cod" => 0));
                    } else {
                        return json_encode(array("cod" => 1, "mensagem" => "Erro ao atualizar senha. Tente novamente."));
                    }
                } else {
                    return json_encode(array("cod" => 1, "mensagem" => "A senha informada está incorreta. Tente novamente."));
                }
            } else {
                header("HTTP/1.1 401 Unauthorized");
                exit;
            }
        }
    };
    $conexao = new Conexao();
    $classe = new Escrita($conexao->conectar());
    $classe->send();
} else {
    header("HTTP/1.1 401 Unauthorized");
    exit;
}
