<?php
session_start();

if (isset($_SESSION["logged"]) && is_array($_SESSION["logged"])) {
    require("conexao.php");

    class Permissao
    {
        public function permissao_obra()
        {
            if ($_SESSION["logged"][1] == 0 || $_SESSION["logged"][1] == 1) {
                return 0;
            } else {
                return $_SESSION["logged"][0];
            }
        }
        public function permissao_notas_fiscais()
        {
            if ($_SESSION["logged"][1] == 0) {
                return 0;
            } else {
                return $_SESSION["logged"][0];
            }
        }
        public function permissao_usuario()
        {
            if ($_SESSION["logged"][1] == 0 || $_SESSION["logged"][1] == 1) {
                return 0;
            } else {
                return 1;
            }
        }
    }

    class Consulta extends Permissao
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
                case ($data->action == "consulta_dash"):
                    echo $this->consulta_dash();
                    break;
                case ($data->action == "consulta_obras"):
                    echo $this->consulta_obras($data->param);
                    break;
                case ($data->action == "consulta_obra"):
                    echo $this->consulta_obra($data->param);
                    break;
                case ($data->action == "consulta_cartao_obra"):
                    echo $this->consulta_cartao_obra($data->param);
                    break;
                case ($data->action == "consulta_cartao_usuario"):
                    echo $this->consulta_cartao_usuario($data->param);
                    break;
                case ($data->action == "consulta_checklist"):
                    echo $this->consulta_checklist($data->param);
                    break;
                case ($data->action == "consulta_diario"):
                    echo $this->consulta_diario($data->param);
                    break;
                case ($data->action == "consulta_atualizacao"):
                    echo $this->consulta_atualizacao($data->param);
                    break;
                case ($data->action == "consulta_financeiro"):
                    echo $this->consulta_financeiro($data->param);
                    break;
                case ($data->action == "consulta_projetos"):
                    echo $this->consulta_arquivos($data->param, "projetos");
                    break;
                case ($data->action == "consulta_documentacao"):
                    echo $this->consulta_arquivos($data->param, "documentacao");
                    break;
                case ($data->action == "consulta_inventario"):
                    echo $this->consulta_inventario($data->param);
                    break;
                case ($data->action == "consulta_usuarios"):
                    echo $this->consulta_usuarios();
                    break;
                case ($data->action == "consulta_usuario"):
                    echo $this->consulta_usuario($data->param);
                    break;
                case ($data->action == "consulta_usuarios_responsavel"):
                    echo $this->consulta_usuarios_responsavel();
                    break;
                case ($data->action == "consulta_usuarios_responsavel_tecnico"):
                    echo $this->consulta_usuarios_responsavel_tecnico();
                    break;
            }
        }

        public function consulta_dash()
        {
            $conexao = $this->con;
            if ($this->permissao_obra() != 0) {
                $permissao_visualizar1_2 = "(obras.responsavel_ID = " . $this->permissao_obra() . " OR obras.responsavel_tecnico_ID = " . $this->permissao_obra() . ")";
                $permissao_visualizar1_2_and = " AND " . $permissao_visualizar1_2;
                $permissao_visualizar1_2_where = " WHERE " . $permissao_visualizar1_2;
                $permissao_visualizar_em_andamento = " AND obras.responsavel_ID = " . $this->permissao_obra() . " OR obras.responsavel_tecnico_ID = " . $this->permissao_obra();
            }
            $query1 = $conexao->prepare("SELECT COUNT(CASE WHEN status = ? THEN 1 END) em_andamento, COUNT(CASE WHEN status = ? THEN 1 END) finalizadas, COUNT(CASE WHEN status = ? AND termino < CURRENT_DATE() THEN 1 END) em_atraso, COUNT(CASE WHEN status = ? AND termino > CURRENT_DATE() THEN 1 END) andamento_normal FROM obras" . $permissao_visualizar1_2_where);
            $query1->execute(array("em_andamento", "finalizadas", "em_andamento", "em_andamento"));
            $result1 = $query1->fetchAll(PDO::FETCH_ASSOC)[0];
            $query2 = $conexao->prepare("SELECT COUNT(DISTINCT pendencias.obra_ID) com_pendencia FROM pendencias LEFT JOIN obras ON (obras.ID=obra_ID) LEFT JOIN checklist ON (checklist.ID=checklist_ID) WHERE checklist.status = ?" . $permissao_visualizar1_2_and);
            $query2->execute(array("novo"));
            $result2 = $query2->fetchAll(PDO::FETCH_ASSOC)[0];
            $query_em_andamento = $conexao->prepare("SELECT obras.ID, obras.nome, responsavel.nome AS responsavel_nome, responsavel.sobrenome AS responsavel_sobrenome, obras.termino FROM obras LEFT JOIN usuarios AS responsavel ON (responsavel.ID=responsavel_ID) WHERE obras.status = ?" . $permissao_visualizar_em_andamento . " ORDER BY obras.ID DESC");
            $query_em_andamento->execute(array("em_andamento"));
            $result_em_andamento = $query_em_andamento->fetchAll(PDO::FETCH_ASSOC);
            for ($i = 0; $i < sizeof($result_em_andamento); $i++) {
                $obra_ID = $result_em_andamento[$i]["ID"];
                $query_pendencias = $conexao->prepare("SELECT COUNT(CASE WHEN pendencias.obra_ID = ? THEN 1 END) pendencias FROM pendencias LEFT JOIN checklist ON (checklist.ID=checklist_ID) WHERE checklist.status = ?");
                $query_pendencias->execute(array($obra_ID, "novo"));
                $result_pendencias = $query_pendencias->fetchAll(PDO::FETCH_ASSOC)[0];
                $result_em_andamento[$i]["pendencias"] = $result_pendencias["pendencias"];
            }
            return json_encode(array_merge($result1, $result2, array("sem_pendencia" => strval($result1["em_andamento"] - $result2["com_pendencia"])), array("lista_em_andamento" => $result_em_andamento)));
        }

        public function consulta_obras($status)
        {
            $conexao = $this->con;
            if ($this->permissao_obra() != 0) {
                $permissao_visualizar = " AND (obras.responsavel_ID = " . $this->permissao_obra() . " OR obras.responsavel_tecnico_ID = " . $this->permissao_obra() . ")";
            }
            $query = $conexao->prepare("SELECT obras.ID, obras.nome, responsavel.nome AS responsavel_nome, responsavel.sobrenome AS responsavel_sobrenome, obras.inicio, obras.termino, obras.foto FROM obras LEFT JOIN usuarios AS responsavel ON (responsavel.ID=responsavel_ID) WHERE obras.status = ?" . $permissao_visualizar . " ORDER BY obras.ID DESC");
            $query->execute(array($status));
            $result = $query->fetchAll(PDO::FETCH_ASSOC);
            return json_encode(array("screen" => $status, "obras" => $result));
        }

        public function consulta_obra($id)
        {
            $conexao = $this->con;
            $query = $conexao->prepare("SELECT obras.nome, obras.responsavel_ID, responsavel.nome AS responsavel_nome, responsavel.sobrenome AS responsavel_sobrenome, obras.responsavel_tecnico_ID, responsavel_tecnico.nome AS responsavel_tecnico_nome, responsavel_tecnico.sobrenome AS responsavel_tecnico_sobrenome, obras.inicio, obras.termino FROM obras LEFT JOIN usuarios AS responsavel ON (responsavel.ID=responsavel_ID) LEFT JOIN usuarios AS responsavel_tecnico ON (responsavel_tecnico.ID=responsavel_tecnico_ID) WHERE obras.ID = ?");
            $query->execute(array($id));
            $result = $query->fetchAll(PDO::FETCH_ASSOC)[0];
            if ($this->permissao_obra() == 0 || $this->permissao_obra() == $result["responsavel_ID"] || $this->permissao_obra() == $result["responsavel_tecnico_ID"]) {
                if ($this->permissao_obra() == 0) {
                    $result["permissao"] = true;
                } else {
                    $result["permissao"] = false;
                }
                return json_encode($result);
            } else {
                header("HTTP/1.1 401 Unauthorized");
                exit;
            }
        }

        public function consulta_cartao_obra($id)
        {
            $conexao = $this->con;
            $query = $conexao->prepare("SELECT obras.nome, obras.responsavel_ID, responsavel.nome AS responsavel_nome, responsavel.sobrenome AS responsavel_sobrenome, obras.responsavel_tecnico_ID, responsavel_tecnico.nome AS responsavel_tecnico_nome, responsavel_tecnico.sobrenome AS responsavel_tecnico_sobrenome, obras.inicio, obras.termino, obras.endereco, obras.status, obras.foto FROM obras LEFT JOIN usuarios AS responsavel ON (responsavel.ID=responsavel_ID) LEFT JOIN usuarios AS responsavel_tecnico ON (responsavel_tecnico.ID=responsavel_tecnico_ID) WHERE obras.ID = ?");
            $query->execute(array($id));
            $result = $query->fetchAll(PDO::FETCH_ASSOC)[0];
            return json_encode($result);
        }

        public function consulta_cartao_usuario($id)
        {
            $conexao = $this->con;
            $query = $conexao->prepare("SELECT nome, sobrenome, matricula, funcao, num_conselho, telefone, email, foto FROM usuarios WHERE ID = ?");
            $query->execute(array($id));
            $result = $query->fetchAll(PDO::FETCH_ASSOC)[0];
            return json_encode($result);
        }

        public function consulta_checklist($id)
        {
            $conexao = $this->con;
            if ($this->permissao_obra() == 0) {
                $permissao = true;
            } else {
                $permissao = false;
            }
            $query = $conexao->prepare("SELECT ID, data, texto, status FROM checklist WHERE obra_ID = ? ORDER BY data DESC");
            $query->execute(array($id));
            $result = $query->fetchAll(PDO::FETCH_ASSOC);
            for ($i = 0; $i < sizeof($result); $i++) {
                $checklist_ID = $result[$i]["ID"];
                $query_pendencias = $conexao->prepare("SELECT pendencias.ID, pendencias.data, pendencias.texto, usuarios.nome, usuarios.sobrenome FROM pendencias LEFT JOIN usuarios ON (usuarios.ID=usuario_ID) WHERE checklist_ID = ?");
                $query_pendencias->execute(array($checklist_ID));
                $result_pendencias = $query_pendencias->fetchAll(PDO::FETCH_ASSOC);
                $result[$i]["pendencias"] = $result_pendencias;
                if ($this->permissao_obra() == 0) {
                    $result[$i]["permissao"] = true;
                } else {
                    $result[$i]["permissao"] = false;
                }
            }
            return json_encode(array("screen" => "checklist", "permissao" => $permissao, "itens" => $result));
        }

        public function consulta_diario($id)
        {
            $conexao = $this->con;
            $query = $conexao->prepare("SELECT diario.ID, diario.data, diario.atividades, diario.usuario_ID, usuarios.nome, usuarios.sobrenome FROM diario LEFT JOIN usuarios ON (usuarios.ID=usuario_ID) WHERE diario.obra_ID = ? ORDER BY data DESC");
            $query->execute(array($id));
            $result = $query->fetchAll(PDO::FETCH_ASSOC);
            for ($i = 0; $i < sizeof($result); $i++) {
                $diario_ID = $result[$i]["ID"];
                $query_foto = $conexao->prepare("SELECT nome FROM diario_fotos WHERE diario_ID = ? ORDER BY id DESC LIMIT 1");
                $query_foto->execute(array($diario_ID));
                $result_foto = $query_foto->fetchAll(PDO::FETCH_ASSOC)[0];
                $result[$i]["foto"] = $result_foto["nome"];
                if ($this->permissao_obra() == 0) {
                    $result[$i]["permissao"] = true;
                } else {
                    if ($this->permissao_obra() == $result[$i]["usuario_ID"]) {
                        $result[$i]["permissao"] = true;
                    } else {
                        $result[$i]["permissao"] = false;
                    }
                }
            }
            return json_encode(array("screen" => "diario", "itens" => $result));
        }

        public function consulta_atualizacao($id)
        {
            $conexao = $this->con;
            $query = $conexao->prepare("SELECT diario.data, diario.atividades, diario.ocorrencias, diario.condicao_tempo, usuarios.nome, usuarios.sobrenome FROM diario LEFT JOIN usuarios ON (usuarios.ID=usuario_ID) WHERE diario.ID = ?");
            $query->execute(array($id));
            $result = $query->fetchAll(PDO::FETCH_ASSOC)[0];
            $query_fotos = $conexao->prepare("SELECT ID, nome FROM diario_fotos WHERE diario_ID = ?");
            $query_fotos->execute(array($id));
            $result_fotos = $query_fotos->fetchAll(PDO::FETCH_ASSOC);
            return json_encode(array_merge($result, array("fotos" => $result_fotos)));
        }

        public function consulta_financeiro($id)
        {
            $conexao = $this->con;
            if ($this->permissao_notas_fiscais() != 0) {
                $permissao_visualizar_notas_fiscais = " AND usuario_ID = " . $this->permissao_notas_fiscais();
            }
            $query_notas_fiscais = $conexao->prepare("SELECT ID, nome, valor, arquivo FROM notas_fiscais WHERE obra_ID = ?" . $permissao_visualizar_notas_fiscais . " ORDER BY ID DESC");
            $query_notas_fiscais->execute(array($id));
            $result_notas_fiscais = $query_notas_fiscais->fetchAll(PDO::FETCH_ASSOC);
            $query_efetivo = $conexao->prepare("SELECT ID, data, funcao, empreiteira, quantidade FROM efetivo WHERE obra_ID = ? ORDER BY data DESC");
            $query_efetivo->execute(array($id));
            $result_efetivo = $query_efetivo->fetchAll(PDO::FETCH_ASSOC);
            for ($i = 0; $i < sizeof($result_efetivo); $i++) {
                $usuario_ID = $result_efetivo[$i]["usuario_ID"];
                if ($this->permissao_obra() == 0) {
                    $result_efetivo[$i]["permissao"] = true;
                } else {
                    if ($this->permissao_obra() == $result_efetivo[$i]["usuario_ID"]) {
                        $result_efetivo[$i]["permissao"] = true;
                    } else {
                        $result_efetivo[$i]["permissao"] = false;
                    }
                }
            }
            return json_encode(array("screen" => "financeiro", "notas_fiscais" => $result_notas_fiscais, "efetivo" => $result_efetivo));
        }

        public function consulta_arquivos($id, $tipo)
        {
            $conexao = $this->con;
            $query = $conexao->prepare("SELECT ID, nome, arquivo, usuario_ID FROM arquivos WHERE obra_ID = ? and tipo = ? ORDER BY ID DESC");
            $query->execute(array($id, $tipo));
            $result = $query->fetchAll(PDO::FETCH_ASSOC);
            for ($i = 0; $i < sizeof($result); $i++) {
                $usuario_ID = $result[$i]["usuario_ID"];
                if ($this->permissao_obra() == 0) {
                    $result[$i]["permissao"] = true;
                } else {
                    if ($this->permissao_obra() == $result[$i]["usuario_ID"]) {
                        $result[$i]["permissao"] = true;
                    } else {
                        $result[$i]["permissao"] = false;
                    }
                }
            }
            return json_encode(array("screen" => $tipo, "itens" => $result));
        }

        public function consulta_inventario($id)
        {
            $conexao = $this->con;
            $query_maquinas_equipamentos = $conexao->prepare("SELECT ID, nome, local, quantidade, usuario_ID FROM inventario WHERE obra_ID = ? AND tipo = ? ORDER BY ID DESC");
            $query_maquinas_equipamentos->execute(array($id, "maquinas_equipamentos"));
            $result_maquinas_equipamentos = $query_maquinas_equipamentos->fetchAll(PDO::FETCH_ASSOC);
            for ($i = 0; $i < sizeof($result_maquinas_equipamentos); $i++) {
                $usuario_ID = $result_maquinas_equipamentos[$i]["usuario_ID"];
                if ($this->permissao_obra() == 0) {
                    $result_maquinas_equipamentos[$i]["permissao"] = true;
                } else {
                    if ($this->permissao_obra() == $result_maquinas_equipamentos[$i]["usuario_ID"]) {
                        $result_maquinas_equipamentos[$i]["permissao"] = true;
                    } else {
                        $result_maquinas_equipamentos[$i]["permissao"] = false;
                    }
                }
            }
            $query_materiais = $conexao->prepare("SELECT ID, nome, quantidade, usuario_ID FROM inventario WHERE obra_ID = ? AND tipo = ? ORDER BY ID DESC");
            $query_materiais->execute(array($id, "materiais"));
            $result_materiais = $query_materiais->fetchAll(PDO::FETCH_ASSOC);
            for ($i = 0; $i < sizeof($result_materiais); $i++) {
                $usuario_ID = $result_materiais[$i]["usuario_ID"];
                if ($this->permissao_obra() == 0) {
                    $result_materiais[$i]["permissao"] = true;
                } else {
                    if ($this->permissao_obra() == $result_materiais[$i]["usuario_ID"]) {
                        $result_materiais[$i]["permissao"] = true;
                    } else {
                        $result_materiais[$i]["permissao"] = false;
                    }
                }
            }
            return json_encode(array("screen" => "inventario", "maquinas_equipamentos" => $result_maquinas_equipamentos, "materiais" => $result_materiais));
        }

        public function consulta_usuarios()
        {
            if ($this->permissao_usuario() == 0) {
                $conexao = $this->con;
                $query = $conexao->prepare("SELECT ID, nome, sobrenome, matricula, funcao, foto FROM usuarios ORDER BY nome, sobrenome");
                $query->execute();
                $result = $query->fetchAll(PDO::FETCH_ASSOC);
                return json_encode(array("screen" => "colaboradores", "usuarios" => $result));
            } else {
                header("HTTP/1.1 401 Unauthorized");
                exit;
            }
        }

        public function consulta_usuario($id)
        {
            if ($this->permissao_usuario() == 0) {
                $conexao = $this->con;
                $query = $conexao->prepare("SELECT nome, sobrenome, matricula, funcao, num_conselho, telefone, email, foto FROM usuarios WHERE ID = ?");
                $query->execute(array($id));
                $result = $query->fetchAll(PDO::FETCH_ASSOC)[0];
                $query_responsavel = $conexao->prepare("SELECT nome FROM obras WHERE responsavel_ID = ?");
                $query_responsavel->execute(array($id));
                $result_responsavel = $query_responsavel->fetchAll(PDO::FETCH_ASSOC);
                $query_responsavel_tecnico = $conexao->prepare("SELECT nome FROM obras WHERE responsavel_tecnico_ID = ?");
                $query_responsavel_tecnico->execute(array($id));
                $result_responsavel_tecnico = $query_responsavel_tecnico->fetchAll(PDO::FETCH_ASSOC);
                return json_encode(array_merge($result, array("como_responsavel" => $result_responsavel, "como_responsavel_tecnico" => $result_responsavel_tecnico)));
            } else {
                header("HTTP/1.1 401 Unauthorized");
                exit;
            }
        }

        public function consulta_usuarios_responsavel()
        {
            if ($this->permissao_usuario() == 0) {
                $conexao = $this->con;
                $query = $conexao->prepare("SELECT ID, nome, sobrenome FROM usuarios WHERE (funcao = ? OR funcao = ? OR funcao = ? OR funcao = ?) AND status = ? ORDER BY nome, sobrenome");
                $query->execute(array("engenheiro", "arquiteto", "encarregado", "executivo", 1));
                $result = $query->fetchAll(PDO::FETCH_ASSOC);
                return json_encode(array("screen" => "lista_responsavel", "usuarios" => $result));
            } else {
                header("HTTP/1.1 401 Unauthorized");
                exit;
            }
        }

        public function consulta_usuarios_responsavel_tecnico()
        {
            if ($this->permissao_usuario() == 0) {
                $conexao = $this->con;
                $query = $conexao->prepare("SELECT ID, nome, sobrenome FROM usuarios WHERE (funcao = ? OR funcao = ?) AND status = ? ORDER BY nome, sobrenome");
                $query->execute(array("engenheiro", "arquiteto", 1));
                $result = $query->fetchAll(PDO::FETCH_ASSOC);
                return json_encode(array("screen" => "lista_responsavel_tecnico", "usuarios" => $result));
            } else {
                header("HTTP/1.1 401 Unauthorized");
                exit;
            }
        }
    };

    $conexao = new Conexao();
    $classe = new Consulta($conexao->conectar());
    $classe->send();
} else {
    header("HTTP/1.1 401 Unauthorized");
    exit;
}
