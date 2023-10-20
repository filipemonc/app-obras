function atualizaMenu(n) {
    let item = document.querySelector("nav .menu li:nth-child(" + n + ")");
    item.className = "list active";
}

window.onload = function () {
    switch (true) {
        case window.location.pathname == "/":
            atualizaMenu(1);
            geraDash();
            break;
        case window.location.pathname == "/obras/":
            atualizaMenu(2);
            geraObras("em_andamento");
            break;
        case window.location.pathname == "/perfil/":
            atualizaMenu(3);
            break;
        case window.location.pathname == "/gestao-colaboradores/":
            atualizaMenu(3);
            geraColaboradores();
            break;
        case window.location.pathname == "/sair/":
            atualizaMenu(4);
            break;
    }
};

function verificaExistencia(nome, operador) {
    var resultado =
        document.querySelector(operador + nome) == null ? false : true;
    return resultado;
}

function buscaValorFormulario(nome) {
    var valor = document.getElementById(nome).value;
    return valor;
}

function limpaValorFormulario(nome) {
    document.getElementById(nome).value = "";
}

function buscaValorImagem(nome) {
    var valor = "";
    if (verificaExistencia(nome.slice(1), nome.slice(0, 1))) {
        valor = document.querySelector(nome).src;
    }
    return valor;
}

function buscaValorMultiImagem() {
    var valor = [];
    var i = 1;
    while (verificaExistencia(`previsualizacao${i} img`, "#")) {
        valor.push(document.querySelector(`#previsualizacao${i} img`).src);
        i++;
    }
    return valor;
}

function buscaValorArquivo(nome) {
    var valor = document.getElementById(nome).files[0];
    return valor;
}

if (verificaExistencia("nav", "")) {
    let menuToggle = document.querySelector(".menu_toggle");
    let navigation = document.querySelector("nav");
    menuToggle.onclick = function () {
        navigation.classList.toggle("active");
    };
}

function validaInformacao(action) {
    if (action == "login") {
        let matricula = buscaValorFormulario("matricula");
        let senha = buscaValorFormulario("senha");
        if (matricula == "" || senha == "") {
            return false;
        } else {
            return true;
        }
    }
    if (action == "cadastra_obra" || action == "edita_obra") {
        let nome = buscaValorFormulario("nome");
        let responsavel = buscaValorFormulario("responsavel");
        let responsavel_tecnico = buscaValorFormulario("responsavel_tecnico");
        let inicio = buscaValorFormulario("inicio");
        let termino = buscaValorFormulario("termino");
        if (
            nome == "" ||
            responsavel == "" ||
            responsavel_tecnico == "" ||
            inicio == "" ||
            termino == ""
        ) {
            return false;
        } else {
            return true;
        }
    }
    if (action == "adiciona_checklist") {
        let date = buscaValorFormulario("data");
        let descricao = buscaValorFormulario("descricao");
        if (date == "" || descricao == "") {
            return false;
        } else {
            return true;
        }
    }
    if (
        action == "conclui_checklist" ||
        action == "exclui_checklist" ||
        action == "exclui_atualizacao" ||
        action == "exclui_nota_fiscal" ||
        action == "exclui_efetivo" ||
        action == "exclui_arquivo_projetos" ||
        action == "exclui_arquivo_documentacao" ||
        action == "exclui_inventario"
    ) {
        return true;
    }
    if (action == "adiciona_pendencia") {
        let pavimento = buscaValorFormulario("pavimento");
        let comodo = buscaValorFormulario("comodo");
        let motivo = buscaValorFormulario("motivo");
        if (pavimento == "" || comodo == "" || motivo == "") {
            return false;
        } else {
            return true;
        }
    }
    if (action == "adiciona_atualizacao") {
        let atividades = buscaValorFormulario("atividades");
        let condicao_tempo = buscaValorFormulario("condicao_tempo");
        if (atividades == "" || condicao_tempo == "") {
            return false;
        } else {
            return true;
        }
    }
    if (action == "adiciona_nota_fiscal_imagem") {
        let nome = buscaValorFormulario("nome");
        let valor = buscaValorFormulario("valor");
        let foto = buscaValorImagem("#previsualizacao img");
        if (nome == "" || valor == "" || foto == "") {
            return false;
        } else {
            return true;
        }
    }
    if (action == "adiciona_nota_fiscal_pdf") {
        let nome = buscaValorFormulario("nome");
        let valor = buscaValorFormulario("valor");
        let arquivo = buscaValorFormulario("arquivo");
        if (nome == "" || valor == "" || arquivo == "") {
            return false;
        } else {
            return true;
        }
    }
    if (action == "cadastra_efetivo") {
        let funcao = buscaValorFormulario("funcao");
        let quantidade = buscaValorFormulario("quantidade");
        if (verificaExistencia("empresa", "#")) {
            let empresa = buscaValorFormulario("empresa");
            if (empresa == "") {
                return false;
            }
        }
        if (funcao == "" || quantidade == "") {
            return false;
        } else {
            return true;
        }
    }
    if (action == "adiciona_arquivo") {
        let nome = buscaValorFormulario("nome");
        let arquivo = buscaValorFormulario("arquivo");
        if (nome == "" || arquivo == "") {
            return false;
        } else {
            return true;
        }
    }
    if (action == "adiciona_inventario") {
        let nome = buscaValorFormulario("nome");
        let quantidade = buscaValorFormulario("quantidade");
        if (verificaExistencia("local", "#")) {
            let local = buscaValorFormulario("local");
            if (local == "") {
                return false;
            }
        }
        if (nome == "" || quantidade == "") {
            return false;
        } else {
            return true;
        }
    }
    if (action == "cadastra_usuario" || action == "edita_usuario") {
        let nome = buscaValorFormulario("nome");
        let sobrenome = buscaValorFormulario("sobrenome");
        let matricula = buscaValorFormulario("matricula");
        let funcao = buscaValorFormulario("funcao");
        let telefone = buscaValorFormulario("telefone");
        let email = buscaValorFormulario("email");
        if (verificaExistencia("senha", "#")) {
            let senha = buscaValorFormulario("senha");
            if (senha == "") {
                return false;
            }
        }
        if (verificaExistencia("num_conselho", "#")) {
            let num_conselho = buscaValorFormulario("num_conselho");
            if (num_conselho == "") {
                return false;
            }
        }
        if (
            nome == "" ||
            sobrenome == "" ||
            matricula == "" ||
            funcao == "" ||
            telefone == "" ||
            email == ""
        ) {
            return false;
        } else {
            return true;
        }
    }
    if (action == "edita_senha") {
        let senha_atual = buscaValorFormulario("senha_atual");
        let nova_senha = buscaValorFormulario("nova_senha");
        let confirma_nova_senha = buscaValorFormulario("confirma_nova_senha");
        if (
            senha_atual == "" ||
            nova_senha == "" ||
            confirma_nova_senha == ""
        ) {
            return false;
        } else {
            if (nova_senha == confirma_nova_senha) {
                return true;
            } else {
                return false;
            }
        }
    }
}

function coletaInformacao(action, param, param_int) {
    var data = "";
    if (action == "login") {
        let matricula = buscaValorFormulario("matricula");
        let senha = buscaValorFormulario("senha");
        data = {
            action: action,
            matricula: matricula,
            senha: senha,
        };
    }
    if (action == "cadastra_obra") {
        let nome = buscaValorFormulario("nome");
        let responsavel = buscaValorFormulario("responsavel");
        let responsavel_tecnico = buscaValorFormulario("responsavel_tecnico");
        let inicio = buscaValorFormulario("inicio");
        let termino = buscaValorFormulario("termino");
        let endereco = buscaValorFormulario("endereco");
        let foto = buscaValorImagem("#previsualizacao img");
        data = {
            action: action,
            nome: nome,
            responsavel: responsavel,
            responsavel_tecnico: responsavel_tecnico,
            inicio: inicio,
            termino: termino,
            endereco: endereco,
            foto: foto,
        };
    }
    if (action == "edita_obra") {
        let nome = buscaValorFormulario("nome");
        let responsavel = buscaValorFormulario("responsavel");
        let responsavel_tecnico = buscaValorFormulario("responsavel_tecnico");
        let inicio = buscaValorFormulario("inicio");
        let termino = buscaValorFormulario("termino");
        let endereco = buscaValorFormulario("endereco");
        let status = buscaValorFormulario("status");
        let foto = "";
        if (buscaValorFormulario("foto")) {
            foto = buscaValorImagem("#previsualizacao img");
        }
        data = {
            action: action,
            id: param,
            nome: nome,
            responsavel: responsavel,
            responsavel_tecnico: responsavel_tecnico,
            inicio: inicio,
            termino: termino,
            endereco: endereco,
            status: status,
            foto: foto,
        };
    }
    if (action == "adiciona_checklist") {
        let date = buscaValorFormulario("data");
        let descricao = buscaValorFormulario("descricao");
        data = {
            action: action,
            data: date,
            texto: descricao,
            obra_ID: param,
        };
    }
    if (action == "conclui_checklist") {
        data = {
            action: action,
            checklist_ID: param_int,
        };
    }
    if (action == "exclui_checklist") {
        data = {
            action: action,
            checklist_ID: param_int,
        };
    }
    if (action == "adiciona_pendencia") {
        let pavimento = buscaValorFormulario("pavimento");
        let comodo = buscaValorFormulario("comodo");
        let motivo = buscaValorFormulario("motivo");
        data = {
            action: action,
            texto: pavimento + " " + comodo + " " + motivo,
            checklist_ID: param_int,
            obra_ID: param,
        };
    }
    if (action == "adiciona_atualizacao") {
        let atividades = buscaValorFormulario("atividades");
        let ocorrencias = buscaValorFormulario("ocorrencia");
        let condicao_tempo = buscaValorFormulario("condicao_tempo");
        let fotos = buscaValorMultiImagem();
        data = {
            action: action,
            atividades: atividades,
            ocorrencias: ocorrencias,
            condicao_tempo: condicao_tempo,
            obra_ID: param,
            fotos: fotos,
        };
    }
    if (action == "exclui_atualizacao") {
        data = {
            action: action,
            atualizacao_ID: param_int,
        };
    }
    if (action == "adiciona_nota_fiscal_imagem") {
        let nome = buscaValorFormulario("nome");
        let valor = buscaValorFormulario("valor").replace(/,/, ".");
        let foto = buscaValorImagem("#previsualizacao img");
        data = {
            action: action,
            nome: nome,
            valor: valor,
            foto: foto,
            obra_ID: param,
        };
    }
    if (action == "exclui_nota_fiscal") {
        data = {
            action: action,
            nota_fiscal_ID: param_int,
        };
    }
    if (action == "cadastra_efetivo") {
        let empreiteira = buscaValorFormulario("empreiteira");
        let funcao = buscaValorFormulario("funcao");
        let quantidade = buscaValorFormulario("quantidade");
        if (verificaExistencia("empresa", "#")) {
            empreiteira = buscaValorFormulario("empresa");
        }
        data = {
            action: action,
            funcao: funcao,
            empreiteira: empreiteira,
            quantidade: quantidade,
            obra_ID: param,
        };
    }
    if (action == "exclui_efetivo") {
        data = {
            action: action,
            efetivo_ID: param_int,
        };
    }
    if (
        action == "exclui_arquivo_projetos" ||
        action == "exclui_arquivo_documentacao"
    ) {
        data = {
            action: action.slice(0, 14),
            arquivo_ID: param_int,
        };
    }
    if (action == "adiciona_inventario") {
        let nome = buscaValorFormulario("nome");
        let quantidade = buscaValorFormulario("quantidade");
        let local = "";
        if (verificaExistencia("local", "#")) {
            local = buscaValorFormulario("local");
        }
        data = {
            action: action,
            nome: nome,
            local: local,
            quantidade: quantidade,
            tipo: param_int,
            obra_ID: param,
        };
    }
    if (action == "exclui_inventario") {
        data = {
            action: action,
            inventario_ID: param_int,
        };
    }
    if (action == "cadastra_usuario") {
        let nome = buscaValorFormulario("nome");
        let sobrenome = buscaValorFormulario("sobrenome");
        let matricula = buscaValorFormulario("matricula");
        let funcao = buscaValorFormulario("funcao");
        let telefone = buscaValorFormulario("telefone");
        let email = buscaValorFormulario("email");
        let senha = buscaValorFormulario("senha");
        let foto = buscaValorImagem("#previsualizacao img");
        let num_conselho = "";
        if (verificaExistencia("num_conselho", "#")) {
            num_conselho = buscaValorFormulario("num_conselho");
        }
        data = {
            action: action,
            nome: nome,
            sobrenome: sobrenome,
            matricula: matricula,
            funcao: funcao,
            telefone: telefone,
            email: email,
            senha: senha,
            foto: foto,
            num_conselho: num_conselho,
        };
    }
    if (action == "edita_usuario") {
        let nome = buscaValorFormulario("nome");
        let sobrenome = buscaValorFormulario("sobrenome");
        let matricula = buscaValorFormulario("matricula");
        let funcao = buscaValorFormulario("funcao");
        let telefone = buscaValorFormulario("telefone");
        let email = buscaValorFormulario("email");
        let senha = "";
        if (verificaExistencia("senha", "#")) {
            senha = buscaValorFormulario("senha");
        }
        let foto = "";
        if (buscaValorFormulario("foto")) {
            foto = buscaValorImagem("#previsualizacao img");
        }
        let num_conselho = "";
        if (verificaExistencia("num_conselho", "#")) {
            num_conselho = buscaValorFormulario("num_conselho");
        }
        data = {
            action: action,
            id: param,
            nome: nome,
            sobrenome: sobrenome,
            matricula: matricula,
            funcao: funcao,
            telefone: telefone,
            email: email,
            senha: senha,
            foto: foto,
            num_conselho: num_conselho,
        };
    }
    if (action == "edita_senha") {
        let senha_atual = buscaValorFormulario("senha_atual");
        let nova_senha = buscaValorFormulario("nova_senha");
        data = {
            action: action,
            id: param,
            senha_atual: senha_atual,
            nova_senha: nova_senha,
        };
    }

    var JSONdata = JSON.stringify(data);
    return JSONdata;
}

function enviaInformacao(action, api, param, param_int) {
    var url = "/api/" + api + "/";
    if (action == "adiciona_nota_fiscal_pdf" || action == "adiciona_arquivo") {
        var data = new FormData();
        data.append("action", action);
        data.append("nome", buscaValorFormulario("nome"));
        if (action == "adiciona_nota_fiscal_pdf") {
            data.append(
                "valor",
                buscaValorFormulario("valor").replace(/,/, ".")
            );
        } else {
            data.append("valor", param_int);
        }
        data.append("arquivo", buscaValorArquivo("arquivo"));
        data.append("obra_ID", param);
    } else {
        var data = coletaInformacao(action, param, param_int);
    }
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        if (
            action != "adiciona_nota_fiscal_pdf" &&
            action != "adiciona_arquivo"
        ) {
            xhr.setRequestHeader(
                "Content-Type",
                "application/json; charset=UTF-8"
            );
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response["cod"] == 0) {
                    return resolve(true);
                }
                if (response["cod"] == 1) {
                    avisoGeral(response["mensagem"]);
                    return resolve(false);
                }
            }
        };
        xhr.send(data);
    });
}

function fecharAviso(element) {
    element.parentElement.remove();
}

function avisoGeral(mensagem) {
    let alertContainer = document.querySelector(".alerta");
    alertContainer.innerHTML =
        `<div class="aviso"><div class="icone"><ion-icon name="alert-circle"></ion-icon></div><div class="mensagem">` +
        mensagem +
        `</div><div class="fechar" onclick="fecharAviso(this)"><ion-icon name="close"></ion-icon></div></div>`;
    setTimeout(function () {
        alertContainer.innerHTML = "";
    }, 3000);
}

async function acionaBotao(botao, action, api, param, param_int) {
    textoBotao = botao.innerHTML;
    if (validaInformacao(action)) {
        botao.innerHTML = `<span class="loader"></span>`;
        botao.disabled = true;
        if (await enviaInformacao(action, api, param, param_int)) {
            switch (true) {
                case action == "login":
                    window.location = "/";
                    break;
                case action == "cadastra_obra" || action == "edita_obra":
                    fecharFormularioNovo(botao);
                    geraObras("em_andamento");
                    break;
                case action == "adiciona_checklist" ||
                    action == "exclui_checklist" ||
                    action == "adiciona_pendencia":
                    fecharFormularioInterno(botao);
                    geraChecklist(param);
                    break;
                case action == "conclui_checklist":
                    geraChecklist(param);
                    break;
                case action == "adiciona_atualizacao" ||
                    action == "exclui_atualizacao":
                    fecharFormularioInterno(botao);
                    geraDiario(param);
                    break;
                case action == "cadastra_efetivo" ||
                    action == "exclui_efetivo" ||
                    action == "adiciona_nota_fiscal_imagem" ||
                    action == "adiciona_nota_fiscal_pdf" ||
                    action == "exclui_nota_fiscal":
                    fecharFormularioInterno(botao);
                    geraFinanceiro(param);
                    break;
                case action == "adiciona_arquivo":
                    fecharFormularioInterno(botao);
                    if (param_int == "projetos") {
                        geraProjetos(param);
                    }
                    if (param_int == "documentacao") {
                        geraDocumentacao(param);
                    }
                    break;
                case action == "exclui_arquivo_projetos" ||
                    action == "exclui_arquivo_documentacao":
                    fecharFormularioInterno(botao);
                    if (action == "exclui_arquivo_projetos") {
                        geraProjetos(param);
                    }
                    if (action == "exclui_arquivo_documentacao") {
                        geraDocumentacao(param);
                    }
                    break;
                case action == "adiciona_inventario" ||
                    action == "exclui_inventario":
                    fecharFormularioInterno(botao);
                    geraInventario(param);
                    break;
                case action == "cadastra_usuario" || action == "edita_usuario":
                    fecharFormularioNovo(botao);
                    geraColaboradores();
                    break;
                case action == "edita_senha":
                    avisoGeral("Senha alterada com sucesso.");
                    limpaValorFormulario("senha_atual");
                    limpaValorFormulario("nova_senha");
                    limpaValorFormulario("confirma_nova_senha");
                    botao.innerHTML = textoBotao;
                    botao.disabled = false;
                    break;
            }
        } else {
            botao.innerHTML = textoBotao;
            botao.disabled = false;
        }
    } else {
        switch (true) {
            case action == "login":
                avisoGeral("Preencha com sua matrícula e senha.");
                break;
            case action == "cadastra_obra" ||
                action == "edita_obra" ||
                action == "adiciona_atualizacao" ||
                action == "cadastra_usuario" ||
                action == "edita_usuario":
                avisoGeral("Preencha os campos obrigatórios.");
                break;
            case action == "adiciona_checklist" ||
                action == "adiciona_nota_fiscal_imagem" ||
                action == "adiciona_nota_fiscal_pdf" ||
                action == "cadastra_efetivo" ||
                action == "adiciona_arquivo" ||
                action == "adiciona_inventario" ||
                action == "edita_senha":
                avisoGeral("Todos os campos são obrigatórios.");
                break;
        }
    }
}

async function acionaBotaoSimples(action, api, param, param_int) {
    if (validaInformacao(action)) {
        if (await enviaInformacao(action, api, param, param_int)) {
            switch (true) {
                case action == "conclui_checklist":
                    geraChecklist(param);
                    break;
            }
        }
    }
}

function buscaInformacao(action, param) {
    var data = {
        action: action,
        param: param,
    };
    var JSONdata = JSON.stringify(data);
    var url = "/api/consulta/";
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                return resolve(response);
            }
        };
        xhr.send(JSONdata);
    });
}

function geraGrafico(id, label1, label2, value1, value2) {
    const grafico = new Chart(document.getElementById(id).getContext("2d"), {
        type: "doughnut",
        data: {
            labels: [label1, label2],
            datasets: [
                {
                    label: label1,
                    data: [value1, value2],
                    backgroundColor: ["rgb(2, 60, 100)", "rgb(217, 217, 217)"],
                    hoverOffset: 4,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: { enabled: false },
            },
            hover: { mode: null },
        },
    });
    const valor = document.querySelector("#" + id + " + .valor");
    valor.innerHTML = value1;
}

function geraGraficosDash(
    valor_em_andamento,
    valor_finalizadas,
    valor_em_atraso,
    valor_andamento_normal,
    valor_com_pendencia,
    valor_sem_pendencia
) {
    document.querySelector(
        ".dash .graficos"
    ).innerHTML = `<div class="conteudo">
  <div class="grafico">
    <canvas id="grafico_em_andamento"></canvas>
    <p class="valor"></p>
  </div>
  <p>Em andamento</p>
</div>
<div class="conteudo">
  <div class="grafico">
    <canvas id="grafico_em_atraso"></canvas>
    <p class="valor"></p>
  </div>
  <p>Em atraso</p>
</div>
<div class="conteudo">
  <div class="grafico">
    <canvas id="grafico_com_pendencia"></canvas>
    <p class="valor"></p>
  </div>
  <p>Com pendências</p>
</div>`;
    geraGrafico(
        "grafico_em_andamento",
        "Em andamento",
        "Finalizadas",
        valor_em_andamento,
        valor_finalizadas
    );
    geraGrafico(
        "grafico_em_atraso",
        "Em atraso",
        "Andamento normal",
        valor_em_atraso,
        valor_andamento_normal
    );
    geraGrafico(
        "grafico_com_pendencia",
        "Com pendência",
        "Sem pendência",
        valor_com_pendencia,
        valor_sem_pendencia
    );
}

function geraListaDash(resposta) {
    var html = "";
    if (resposta.length > 0) {
        for (var i = 0; i < resposta.length; i++) {
            var pendencias = "";
            if (resposta[i].pendencias > 0) {
                pendencias =
                    `<div class="pendencia"><div class="texto">` +
                    resposta[i].pendencias +
                    `</div><div class="icone_pendencia"><ion-icon name="warning"></ion-icon></div></div>`;
            }
            html +=
                `<div class="linha" onclick="geraObra(` +
                resposta[i].ID +
                `)"><div class="nome">` +
                resposta[i].nome +
                `</div><div class="termino">Prazo de término: ` +
                formataData(resposta[i].termino) +
                `</div><div class="responsavel">` +
                resposta[i].responsavel_nome +
                ` ` +
                resposta[i].responsavel_sobrenome +
                `</div>` +
                pendencias +
                `<div class="icone"><ion-icon name="chevron-forward"></ion-icon></div></div>`;
        }
    } else {
        html += "<p>Nenhum resultado encontrado</p>";
    }
    document.querySelector(".dash .em_andamento_dash .linhas").innerHTML = html;
}

async function geraDash() {
    var data = await buscaInformacao("consulta_dash", "");
    geraGraficosDash(
        data["em_andamento"],
        data["finalizadas"],
        data["em_atraso"],
        data["andamento_normal"],
        data["com_pendencia"],
        data["sem_pendencia"]
    );
    geraListaDash(data["lista_em_andamento"]);
}

function geraListaObras(resposta) {
    var html = "";
    if (resposta.length > 0) {
        for (var i = 0; i < resposta.length; i++) {
            var foto = "";
            if (resposta[i].foto == "") {
                foto = `<ion-icon name="camera"></ion-icon>`;
            } else {
                foto =
                    `<img src="/img-obras/` +
                    resposta[i].foto +
                    `-thumb.jpeg" alt="" />`;
            }
            html +=
                `<div class="box" onclick="geraObra(` +
                resposta[i].ID +
                `)"><div class="imagem">` +
                foto +
                `</div><div class="texto"><p class="nome">` +
                resposta[i].nome +
                `</p><p>Responsável: ` +
                resposta[i].responsavel_nome +
                ` ` +
                resposta[i].responsavel_sobrenome +
                `</p><p>Início: ` +
                formataData(resposta[i].inicio) +
                `</p><p>Previsão de término: ` +
                formataData(resposta[i].termino) +
                `</p></div><div class="icone"><ion-icon name="chevron-forward"></ion-icon></div></div>`;
        }
    } else {
        html += "<p>Nenhum resultado encontrado</p>";
    }
    document.querySelector(".obras").innerHTML = html;
}

async function geraObras(status) {
    let abas = document.querySelectorAll(".abas.nivel_obras ul li");
    abas.forEach(function (item) {
        item.className = "";
    });
    document.getElementById(status).className = "active";
    document.querySelector(
        ".obras"
    ).innerHTML = `<div class="preloader"></div>`;
    var data = await buscaInformacao("consulta_obras", status);
    geraListaObras(data["obras"]);
}

async function geraObra(id) {
    document.querySelector(
        ".content .modal"
    ).innerHTML += `<div class="overlay"><div class="preloader"></div></div>`;
    var data = await buscaInformacao("consulta_obra", id);
    var botao_editar = "";
    if (data["permissao"] == true) {
        botao_editar =
            `<div class="editar" onclick="fecharModal(this); geraFormularioEditarObra(` +
            id +
            `);"><ion-icon name="create-outline"></ion-icon></div>`;
    }
    document.querySelector(".content .modal .overlay").innerHTML =
        `<div class="obra">
          <div class="controles">` +
        botao_editar +
        `<div class="fechar" onclick="fecharModal(this); atualizaPagina();">
              <ion-icon name="close-outline"></ion-icon>
            </div>
          </div>
          <div class="infos"><div class="nome">
          ` +
        data["nome"] +
        `
          <div class="icone" onclick="geraCartaoObra(` +
        id +
        `)">
            <ion-icon name="information-circle"></ion-icon>
          </div><div class="cartao_obra"></div>
        </div>
        <div class="responsavel">
          Responsável: ` +
        data["responsavel_nome"] +
        ` ` +
        data["responsavel_sobrenome"] +
        `
          <div class="icone" onclick="geraCartaoPessoa('responsavel',` +
        data["responsavel_ID"] +
        `)">
            <ion-icon name="person-circle"></ion-icon>
          </div><div class="cartao_pessoa"></div>
        </div>
        <div class="responsavel_tecnico">
          Responsável técnico: ` +
        data["responsavel_tecnico_nome"] +
        ` ` +
        data["responsavel_tecnico_sobrenome"] +
        `
          <div class="icone" onclick="geraCartaoPessoa('responsavel_tecnico',` +
        data["responsavel_tecnico_ID"] +
        `)">
            <ion-icon name="person-circle"></ion-icon>
          </div><div class="cartao_pessoa"></div>
        </div>
        <div class="inicio">Início: ` +
        formataData(data["inicio"]) +
        `</div>
        <div class="termino">Previsão de término: ` +
        formataData(data["termino"]) +
        `</div>
        </div><div class="abas nivel_interno">
            <ul>
              <li id="checklist" onclick="geraChecklist(` +
        id +
        `)">Checklist</li>
              <li id="diario" onclick="geraDiario(` +
        id +
        `)">Diário de obra</li>
              <li id="financeiro" onclick="geraFinanceiro(` +
        id +
        `)">Financeiro</li>
              <li id="projetos" onclick="geraProjetos(` +
        id +
        `)">Projetos</li>
              <li id="documentacao" onclick="geraDocumentacao(` +
        id +
        `)">Documentação</li>
              <li id="inventario" onclick="geraInventario(` +
        id +
        `)">Inventário</li>
            </ul>
          </div>
          <div class="conteudo_aba">
          </div>
        </div>`;
    geraChecklist(id);
}

async function geraChecklist(id) {
    atualizaAbasInterno("checklist");
    geraLoadingObra();
    var data = await buscaInformacao("consulta_checklist", id);
    var itens = data["itens"];
    var botao_adicionar = "";
    if (data["permissao"] == true) {
        botao_adicionar =
            `<div class="adicionar" onclick="geraFormularioNovoChecklist(` +
            id +
            `)"><div class="icone_botao"><ion-icon name="add"></ion-icon></div>Adicionar nova entrada</div>`;
    }
    var html1 = botao_adicionar + `<ul class="metas">`;
    if (itens.length > 0) {
        for (var i = 0; i < itens.length; i++) {
            var controles = "";
            if (itens[i].status == "novo") {
                if (itens[i].permissao == true) {
                    controles +=
                        `<span class="controles_interno"><span class="secundario" onclick="geraFormularioConfirmacaoExclusao('Esta ação irá excluir esta entrada incluindo todas as pendências associadas e não poderá ser desfeita. Deseja prosseguir?', 'exclui_checklist',` +
                        id +
                        ` , ` +
                        itens[i].ID +
                        `)"><ion-icon name="close-outline"></ion-icon></span><span class="principal" onclick="acionaBotaoSimples('conclui_checklist','escrita', ` +
                        id +
                        `,` +
                        itens[i].ID +
                        `)"><ion-icon name="checkmark-outline"></ion-icon><span class="legenda">concluir</span></span></span>`;
                }
                controles +=
                    `<span class="controles_interno"><span class="pendencia" onclick="geraFormularioNovaPendencia(` +
                    id +
                    `,` +
                    itens[i].ID +
                    `)"><ion-icon name="alert"></ion-icon><span class="legenda">informar pendência</span></span></span>`;
            }
            var pendencias = itens[i]["pendencias"];
            var html2 = `<ul class="pendencias">`;
            for (var j = 0; j < pendencias.length; j++) {
                html2 +=
                    `<li><div class="seta"><ion-icon name="return-down-forward"></ion-icon></div><div class="icone"><ion-icon name="timer-outline"></ion-icon></div><p>Pendência ` +
                    pendencias[j].texto +
                    ` informada por ` +
                    pendencias[j].nome +
                    ` ` +
                    pendencias[j].sobrenome +
                    ` em ` +
                    formataData(pendencias[j].data) +
                    `</p></li>`;
            }
            html2 += "</ul>";
            html1 +=
                `<li class="` +
                itens[i].status +
                `"><p><strong>` +
                formataData(itens[i].data) +
                `</strong>` +
                itens[i].texto +
                `</p>` +
                controles +
                html2 +
                `</li>`;
        }
        html1 += "</ul>";
    } else {
        html1 += "<p>Nenhum resultado encontrado</p>";
    }
    document.querySelector(
        ".content .modal .overlay .obra .conteudo_aba"
    ).innerHTML = html1;
}

async function geraDiario(id) {
    atualizaAbasInterno("diario");
    geraLoadingObra();
    var data = await buscaInformacao("consulta_diario", id);
    var itens = data["itens"];
    var html =
        `<div class="adicionar_diario" onclick="geraFormularioNovaAtualizacao(` +
        id +
        `)"><div class="icone_adicionar"><ion-icon name="add"></ion-icon></div>Enviar nova atualização</div>`;
    if (itens.length > 0) {
        for (var i = 0; i < itens.length; i++) {
            var foto = "";
            if (itens[i].foto == null) {
                foto = `<ion-icon name="camera"></ion-icon>`;
            } else {
                foto =
                    `<img src="/img-diario/` +
                    itens[i].foto +
                    `-thumb.jpeg" alt="" />`;
            }
            var remover = "";
            if (itens[i].permissao == true) {
                remover =
                    `<div class="remover_atualizacao" onclick="geraFormularioConfirmacaoExclusao('Esta ação irá excluir esta atualização incluindo todas as informações associadas e não poderá ser desfeita. Deseja prosseguir?', 'exclui_atualizacao', ` +
                    id +
                    `, ` +
                    itens[i].ID +
                    `)"><ion-icon name="trash"></ion-icon></div>`;
            }
            html +=
                `<div class="atualizacao"><div class="imagem_atualizacao" onclick="geraCartaoAtualizacao(` +
                itens[i].ID +
                `)">` +
                foto +
                `</div><div class="texto" onclick="geraCartaoAtualizacao(` +
                itens[i].ID +
                `)"><p><strong>` +
                formataData(itens[i].data) +
                `</strong> por ` +
                itens[i].nome +
                ` ` +
                itens[i].sobrenome +
                `</p><p>` +
                itens[i].atividades +
                `</p></div>` +
                remover +
                `</div>`;
        }
    } else {
        html += "<p>Nenhum resultado encontrado</p>";
    }
    document.querySelector(
        ".content .modal .overlay .obra .conteudo_aba"
    ).innerHTML = html;
}

async function geraFinanceiro(id) {
    atualizaAbasInterno("financeiro");
    geraLoadingObra();
    var data = await buscaInformacao("consulta_financeiro", id);
    var notas_fiscais = data["notas_fiscais"];
    var efetivo = data["efetivo"];
    var html =
        `<div class="adicionar" onclick="geraFormularioNovaNotaFiscal(` +
        id +
        `)"><div class="icone_botao"><ion-icon name="add"></ion-icon></div>Adicionar nova nota fiscal</div><div class="adicionar" onclick="geraFormularioNovoEfetivo(` +
        id +
        `)"><div class="icone_botao"><ion-icon name="add"></ion-icon></div>Cadastrar efetivo</div><p class="titulo">Notas Fiscais</p><ul class="notas_fiscais">`;
    if (notas_fiscais.length > 0) {
        for (var i = 0; i < notas_fiscais.length; i++) {
            html +=
                `<li><div class="icone_notas_fiscais"><ion-icon name="receipt"></ion-icon></div><a href="/notas-fiscais/` +
                notas_fiscais[i].arquivo +
                `.pdf" target="_blank"><p>` +
                notas_fiscais[i].nome +
                `</p><p><strong>` +
                "R$ " +
                notas_fiscais[i].valor.replace(".", ",") +
                `</strong></p></a><span class="controles_interno"><span class="secundario" onclick="geraFormularioConfirmacaoExclusao('Esta ação irá excluir esta nota fiscal e não poderá ser desfeita. Deseja prosseguir?', 'exclui_nota_fiscal', ` +
                id +
                `, ` +
                notas_fiscais[i].ID +
                `)"><ion-icon name="close-outline"></ion-icon></span></span></li>`;
        }
    } else {
        html += "<p>Nenhum resultado encontrado</p>";
    }
    html += `</ul><p class="titulo">Efetivo</p><ul class="efetivo">`;
    if (efetivo.length > 0) {
        for (var i = 0; i < efetivo.length; i++) {
            var remover = "";
            if (efetivo[i].permissao == true) {
                remover =
                    `<span class="controles_interno"><span class="secundario" onclick="geraFormularioConfirmacaoExclusao('Esta ação irá excluir esta entrada e não poderá ser desfeita. Deseja prosseguir?', 'exclui_efetivo', ` +
                    id +
                    `, ` +
                    efetivo[i].ID +
                    `)"><ion-icon name="close-outline"></ion-icon></span></span>`;
            }
            var empreiteira = "";
            if (efetivo[i].empreiteira != "")
                empreiteira = " (" + efetivo[i].empreiteira + ")";
            html +=
                `<li><p><strong>` +
                formataData(efetivo[i].data) +
                `</strong></p><p>` +
                efetivo[i].funcao +
                empreiteira +
                `</p><p>` +
                efetivo[i].quantidade +
                `</p>` +
                remover +
                `</li>`;
        }
    } else {
        html += "<p>Nenhum resultado encontrado</p>";
    }
    html += "</ul>";
    document.querySelector(
        ".content .modal .overlay .obra .conteudo_aba"
    ).innerHTML = html;
}

async function geraProjetos(id) {
    atualizaAbasInterno("projetos");
    geraLoadingObra();
    var data = await buscaInformacao("consulta_projetos", id);
    var itens = data["itens"];
    var html =
        `<div class="adicionar" onclick="geraFormularioNovoArquivo('projetos', ` +
        id +
        `)"><div class="icone_botao"><ion-icon name="add"></ion-icon></div>Adicionar novo projeto</div><ul class="arquivos">`;
    if (itens.length > 0) {
        for (var i = 0; i < itens.length; i++) {
            var remover = "";
            if (itens[i].permissao == true) {
                remover =
                    `<span class="secundario" onclick="geraFormularioConfirmacaoExclusao('Esta ação irá excluir este projeto e não poderá ser desfeita. Deseja prosseguir?', 'exclui_arquivo_projetos', ` +
                    id +
                    `, ` +
                    itens[i].ID +
                    `)"><ion-icon name="close-outline"></ion-icon></span>`;
            }
            html +=
                `<li><div class="icone_arquivos"><ion-icon name="document-text"></ion-icon></div><a href="/arquivos/` +
                itens[i].arquivo +
                `" target="_blank">` +
                itens[i].nome +
                `</a><span class="controles_interno">` +
                remover +
                `<span class="link" onclick="copiarLink('` +
                itens[i].arquivo +
                `', this)"><ion-icon name="link-outline"></ion-icon><span class="legenda">copiar link</span></span></span></li>`;
        }
    } else {
        html += "<p>Nenhum resultado encontrado</p>";
    }
    html += "</ul>";
    document.querySelector(
        ".content .modal .overlay .obra .conteudo_aba"
    ).innerHTML = html;
}

async function geraDocumentacao(id) {
    atualizaAbasInterno("documentacao");
    geraLoadingObra();
    var data = await buscaInformacao("consulta_documentacao", id);
    var itens = data["itens"];
    var html =
        `<div class="adicionar" onclick="geraFormularioNovoArquivo('documentacao', ` +
        id +
        `)"><div class="icone_botao"><ion-icon name="add"></ion-icon></div>Adicionar novo documento</div><ul class="arquivos">`;
    if (itens.length > 0) {
        for (var i = 0; i < itens.length; i++) {
            var remover = "";
            if (itens[i].permissao == true) {
                remover =
                    `<span class="secundario" onclick="geraFormularioConfirmacaoExclusao('Esta ação irá excluir este documento e não poderá ser desfeita. Deseja prosseguir?', 'exclui_arquivo_documentacao', ` +
                    id +
                    `,` +
                    itens[i].ID +
                    `)"><ion-icon name="close-outline"></ion-icon></span>`;
            }
            html +=
                `<li><div class="icone_arquivos"><ion-icon name="document-text"></ion-icon></div><a href="/arquivos/` +
                itens[i].arquivo +
                `" target="_blank">` +
                itens[i].nome +
                `</a><span class="controles_interno">` +
                remover +
                `<span class="link" onclick="copiarLink('` +
                itens[i].arquivo +
                `', this)"><ion-icon name="link-outline"></ion-icon><span class="legenda">copiar link</span></span></span></li>`;
        }
    } else {
        html += "<p>Nenhum resultado encontrado</p>";
    }
    html += "</ul>";
    document.querySelector(
        ".content .modal .overlay .obra .conteudo_aba"
    ).innerHTML = html;
}

async function geraInventario(id) {
    atualizaAbasInterno("inventario");
    geraLoadingObra();
    var data = await buscaInformacao("consulta_inventario", id);
    var maquinas_equipamentos = data["maquinas_equipamentos"];
    var materiais = data["materiais"];
    var html =
        `<div class="adicionar" onclick="geraFormularioNovaMaquina(` +
        id +
        `)"><div class="icone_botao"><ion-icon name="add"></ion-icon></div>Adicionar máquina ou equipamento</div><div class="adicionar" onclick="geraFormularioNovoMaterial(` +
        id +
        `)"><div class="icone_botao"><ion-icon name="add"></ion-icon></div>Adicionar material</div><p class="titulo">Máquinas e equipamentos</p><ul class="maquinas">`;
    if (maquinas_equipamentos.length > 0) {
        for (var i = 0; i < maquinas_equipamentos.length; i++) {
            var remover = "";
            if (maquinas_equipamentos[i].permissao == true) {
                remover =
                    `<span class="controles_interno"><span class="secundario" onclick="geraFormularioConfirmacaoExclusao('Esta ação irá excluir esta entrada e não poderá ser desfeita. Deseja prosseguir?', 'exclui_inventario', ` +
                    id +
                    `,` +
                    maquinas_equipamentos[i].ID +
                    `)"><ion-icon name="close-outline"></ion-icon></span></span>`;
            }
            html +=
                `<li><p>` +
                maquinas_equipamentos[i].nome +
                `</p><p>` +
                maquinas_equipamentos[i].local +
                `</p><p><strong>` +
                maquinas_equipamentos[i].quantidade +
                `h</strong></p>` +
                remover +
                `</li>`;
        }
    } else {
        html += "<p>Nenhum resultado encontrado</p>";
    }
    html += `</ul><p class="titulo">Materiais</p><ul class="materiais">`;
    if (materiais.length > 0) {
        for (var i = 0; i < materiais.length; i++) {
            var remover = "";
            if (materiais[i].permissao == true) {
                remover =
                    `<span class="controles_interno"><span class="secundario" onclick="geraFormularioConfirmacaoExclusao('Esta ação irá excluir esta entrada e não poderá ser desfeita. Deseja prosseguir?', 'exclui_inventario', ` +
                    id +
                    `, ` +
                    materiais[i].ID +
                    `)"><ion-icon name="close-outline"></ion-icon></span></span>`;
            }
            html +=
                `<li><p>` +
                materiais[i].nome +
                `</p><p><strong>` +
                materiais[i].quantidade +
                `</strong></p>` +
                remover +
                `</li>`;
        }
    } else {
        html += "<p>Nenhum resultado encontrado</p>";
    }
    html += "</ul>";
    document.querySelector(
        ".content .modal .overlay .obra .conteudo_aba"
    ).innerHTML = html;
}

async function geraCartaoObra(id) {
    document.querySelector(
        ".content .modal .overlay .obra .infos .nome .cartao_obra"
    ).innerHTML += `<div class="box_balao"><div class="preloader"></div></div>`;
    var data = await buscaInformacao("consulta_cartao_obra", id);
    var foto = "";
    if (data["foto"] == "") {
        foto = `<ion-icon name="camera"></ion-icon>`;
    } else {
        foto =
            `<img src="/img-obras/` + data["foto"] + `-thumb.jpeg" alt="" />`;
    }
    var html =
        `<div class="box_balao"><div class="cartao"><div class="imagem">` +
        foto +
        `</div><p class="nome">` +
        data["nome"] +
        `</p></div><div class="texto"><p>Responsável: ` +
        data["responsavel_nome"] +
        ` ` +
        data["responsavel_sobrenome"] +
        `</p><p>Responsável técnico: ` +
        data["responsavel_tecnico_nome"] +
        ` ` +
        data["responsavel_tecnico_sobrenome"] +
        `</p><p>Início: ` +
        formataData(data["inicio"]) +
        `</p><p>Previsão de término: ` +
        formataData(data["termino"]) +
        `</p><p>Endereço: ` +
        data["endereco"] +
        `</p></div><div class="fechar" onclick="fecharCartao(this)"><ion-icon name="close-outline"></ion-icon></div></div>`;
    document.querySelector(
        ".content .modal .overlay .obra .infos .nome .cartao_obra"
    ).innerHTML = html;
}

async function geraCartaoPessoa(papel, id) {
    document.querySelector(
        ".content .modal .overlay .obra .infos ." + papel + " .cartao_pessoa"
    ).innerHTML += `<div class="box_balao"><div class="preloader"></div></div>`;
    var data = await buscaInformacao("consulta_cartao_usuario", id);
    var foto = "";
    if (data["foto"] == "") {
        foto = `<ion-icon name="camera"></ion-icon>`;
    } else {
        foto = `<img src="/img-usuarios/` + data["foto"] + `.jpeg" alt="" />`;
    }
    var num_conselho = "";
    if (data["funcao"] == "engenheiro") {
        num_conselho = `</p><p>CREA: ` + data["num_conselho"];
    }
    if (data["funcao"] == "arquiteto") {
        num_conselho = `</p><p>CAU: ` + data["num_conselho"];
    }
    var html =
        `<div class="box_balao"><div class="cartao"><div class="imagem">` +
        foto +
        `</div><p class="nome">` +
        data["nome"] +
        ` ` +
        data["sobrenome"] +
        `</p><p class="matricula">` +
        data["matricula"] +
        `</p></div><div class="texto"><p>Função: ` +
        data["funcao"].toUpperCase() +
        (data["funcao"] == "engenheiro" || data["funcao"] == "arquiteto"
            ? "(A)"
            : "") +
        num_conselho +
        `</p><p>Telefone: ` +
        data["telefone"] +
        `</p><p>E-mail: ` +
        data["email"] +
        `</p></div><div class="fechar" onclick="fecharCartao(this)"><ion-icon name="close-outline"></ion-icon></div></div>`;
    document.querySelector(
        ".content .modal .overlay .obra .infos ." + papel + " .cartao_pessoa"
    ).innerHTML = html;
}

async function geraCartaoAtualizacao(id) {
    document.querySelector(
        ".content .modal .overlay .obra"
    ).innerHTML += `<div class="cartao_atualizacao"><div class="preloader"></div></div>`;
    var data = await buscaInformacao("consulta_atualizacao", id);
    var fotos = data["fotos"];
    var html2 = "";
    if (fotos.length > 0) {
        html2 = `<p class="titulo">Fotos</p><ul class="fotos">`;
        for (var i = 0; i < fotos.length; i++) {
            html2 +=
                `<li><span class="maximizar"><ion-icon name="expand-outline"></ion-icon></span><img src="/img-diario/` +
                fotos[i].nome +
                `-thumb.jpeg" alt="" data-original="` +
                fotos[i].nome +
                `-full.jpeg" onclick="maximizarFoto(this)" /></li>`;
        }
        html2 += `</ul>`;
    }
    var html1 =
        `<p class="data"><strong>` +
        formataData(data["data"]) +
        `</strong> por ` +
        data["nome"] +
        ` ` +
        data["sobrenome"] +
        `</p><p class="atividades">Atividades: ` +
        data["atividades"] +
        `</p><p class="ocorrencias">Ocorrências: ` +
        (data["ocorrencias"] == "" ? "Nenhuma" : data["ocorrencias"]) +
        `</p><p class="condicao_tempo">Condição do tempo: ` +
        data["condicao_tempo"] +
        `</p>` +
        html2 +
        `<div class="fechar" onclick="fecharCartao(this)"><ion-icon name="close-outline"></ion-icon></div></div>`;
    document.querySelector(
        ".content .modal .overlay .obra .cartao_atualizacao"
    ).innerHTML = html1;
}

function maximizarFoto(element) {
    fullImageName = element.getAttribute("data-original");
    document.querySelector(".content .modal").innerHTML +=
        `<div class="overlay_foto" onclick="fecharOverlay(this)"><img src="/img-diario/` +
        fullImageName +
        `" alt="" /><div class="fechar" onclick="fecharCartao(this)"><ion-icon name="close-outline"></ion-icon></div></div>`;
}

function atualizaAbasInterno(aba) {
    let abas = document.querySelectorAll(".abas.nivel_interno ul li");
    abas.forEach(function (item) {
        item.className = "";
    });
    document.getElementById(aba).className = "active";
}

function geraLoadingObra() {
    document.querySelector(
        ".content .modal .overlay .obra .conteudo_aba"
    ).innerHTML = `<div class="preloader"></div>`;
}

function geraListaColaboradores(resposta) {
    var html1 = "";
    if (resposta.length > 0) {
        for (var i = 0; i < resposta.length; i++) {
            var foto = "";
            if (resposta[i].foto == "") {
                foto = `<ion-icon name="camera"></ion-icon>`;
            } else {
                foto =
                    `<img src="/img-usuarios/` +
                    resposta[i].foto +
                    `.jpeg" alt="" />`;
            }
            html1 +=
                `<div class="box" onclick="geraColaborador(` +
                resposta[i].ID +
                `)"><div class="imagem">` +
                foto +
                `</div><div class="texto"><p class="nome">` +
                resposta[i].nome +
                ` ` +
                resposta[i].sobrenome +
                `</p><p>Matrícula: ` +
                resposta[i].matricula +
                `</p><p>Função: ` +
                resposta[i].funcao.toUpperCase() +
                (resposta[i].funcao == "engenheiro" ||
                resposta[i].funcao == "arquiteto"
                    ? "(A)"
                    : "") +
                `</p></div><div class="icone"><ion-icon name="chevron-forward"></ion-icon></div></div>`;
        }
    } else {
        html1 += "<p>Nenhum resultado encontrado</p>";
    }
    document.querySelector(".colaboradores").innerHTML = html1;
}

async function geraColaboradores() {
    document.querySelector(
        ".colaboradores"
    ).innerHTML = `<div class="preloader"></div>`;
    var data = await buscaInformacao("consulta_usuarios", "");
    geraListaColaboradores(data["usuarios"]);
}

async function geraColaborador(id) {
    document.querySelector(
        ".content .modal"
    ).innerHTML += `<div class="overlay"><div class="preloader"></div></div>`;
    var data = await buscaInformacao("consulta_usuario", id);
    var como_responsavel = data["como_responsavel"];
    var html2 = `<ul class="lista_obras">`;
    if (como_responsavel.length > 0) {
        for (var i = 0; i < como_responsavel.length; i++) {
            html2 += `<li><p>` + como_responsavel[i].nome + `</p></li>`;
        }
        html2 += "</ul>";
    } else {
        html2 += "<p>Nenhum resultado encontrado</p>";
    }
    var como_responsavel_tecnico = data["como_responsavel_tecnico"];
    var html3 = `<ul class="lista_obras">`;
    if (como_responsavel_tecnico.length > 0) {
        for (var i = 0; i < como_responsavel_tecnico.length; i++) {
            html3 += `<li><p>` + como_responsavel_tecnico[i].nome + `</p></li>`;
        }
        html3 += "</ul>";
    } else {
        html3 += "<p>Nenhum resultado encontrado</p>";
    }
    var foto = "";
    if (data["foto"] == "") {
        foto = `<ion-icon name="camera"></ion-icon>`;
    } else {
        foto = `<img src="/img-usuarios/` + data["foto"] + `.jpeg" alt="" />`;
    }
    var num_conselho = "";
    if (data["funcao"] == "engenheiro") {
        num_conselho = `</p><p>CREA: ` + data["num_conselho"];
    }
    if (data["funcao"] == "arquiteto") {
        num_conselho = `</p><p>CAU: ` + data["num_conselho"];
    }
    document.querySelector(".content .modal .overlay").innerHTML =
        `<div class="colaborador">
          <div class="controles">
            <div class="editar" onclick="fecharModal(this); geraFormularioEditarColaborador(` +
        id +
        `);">
              <ion-icon name="create-outline"></ion-icon>
            </div>
            <div class="fechar" onclick="fecharModal(this)">
              <ion-icon name="close-outline"></ion-icon>
            </div>
          </div>
          <div class="cartao"><div class="imagem">` +
        foto +
        `</div><p class="nome">` +
        data["nome"] +
        ` ` +
        data["sobrenome"] +
        `</p><p class="matricula">` +
        data["matricula"] +
        `</p></div><div class="texto"><p>Função: ` +
        data["funcao"].toUpperCase() +
        (data["funcao"] == "engenheiro" || data["funcao"] == "arquiteto"
            ? "(A)"
            : "") +
        num_conselho +
        `</p><p>Telefone: ` +
        data["telefone"] +
        `</p><p>E-mail: ` +
        data["email"] +
        `</p></div><div class="listas"><div class="lista_responsavel"><p class="title">Obras como Responsável</p><div class="conteudo_responsavel">` +
        html2 +
        `</div></div><div class="lista_responsavel"><p class="title">Obras como Responsável técnico</p><div class="conteudo_responsavel">` +
        html3 +
        `</div></div></div></div>`;
}

async function geraFormularioNovaObra() {
    document.querySelector(
        ".content .modal"
    ).innerHTML += `<div class="overlay"><div class="preloader"></div></div>`;
    var data_aux = await buscaInformacao("consulta_usuarios_responsavel", "");
    var lista_responsavel = data_aux["usuarios"];
    var options1 = "";
    for (i = 0; i < lista_responsavel.length; i++) {
        options1 =
            options1 +
            `<option value="${lista_responsavel[i].ID}">${lista_responsavel[i].nome} ${lista_responsavel[i].sobrenome}</option>`;
    }
    var data_aux = await buscaInformacao(
        "consulta_usuarios_responsavel_tecnico",
        ""
    );
    var lista_responsavel_tecnico = data_aux["usuarios"];
    var options2 = "";
    for (i = 0; i < lista_responsavel_tecnico.length; i++) {
        options2 =
            options2 +
            `<option value="${lista_responsavel_tecnico[i].ID}">${lista_responsavel_tecnico[i].nome} ${lista_responsavel_tecnico[i].sobrenome}</option>`;
    }
    document.querySelector(".content .modal .overlay").innerHTML =
        `<div class="formulario_novo">
    <h3>Cadastrar obra</h3>
    <div class="conteudo">
      <div class="formulario">
        <div class="bloco unico">
          <input type="text" id="nome" placeholder=" " required />
          <label for="nome">Nome</label>
        </div>
        <div class="bloco duplo meio com_espacamento">
          <select id="responsavel" required>
            <option value="" selected disabled></option>` +
        options1 +
        `</select>
          <label for="responsavel">Responsável</label>
          <div class="icone"><ion-icon name="chevron-down"></ion-icon></div>
        </div>
        <div class="bloco duplo meio">
          <select id="responsavel_tecnico" required>
            <option value="" selected disabled></option>` +
        options2 +
        `</select>
          <label for="responsavel_tecnico">Responsável técnico</label>
          <div class="icone"><ion-icon name="chevron-down"></ion-icon></div>
        </div>
        <div class="bloco duplo meio com_espacamento">
          <input type="text" id="inicio" onfocus="(this.type='date')" placeholder=" " required />
          <label for="inicio">Data de início</label>
        </div>
        <div class="bloco duplo meio">
          <input type="text" id="termino" onfocus="(this.type='date')" placeholder=" " required />
          <label for="termino">Previsão de término</label>
        </div>
        <div class="bloco unico">
          <input type="text" id="endereco" placeholder=" " required />
          <label for="endereco">Endereço</label>
        </div>
        <div class="bloco_imagem">
          <input type="file" id="foto" accept="image/*" onchange="previsualizarImagem()" />
          <label for="foto"><div id="previsualizacao" class="imagem"><ion-icon name="camera"></ion-icon></div><div class="legenda">Foto da obra</div></label>
        </div>
      </div>
      <div class="options">
        <button class="button confirm" onclick="acionaBotao(this,'cadastra_obra','escrita','','')">Cadastrar</button>
        <button class="button cancel" onclick="fecharFormularioNovo(this)">Cancelar</button>
      </div>
    </div>
  </div>`;
}

async function geraFormularioEditarObra(id) {
    document.querySelector(
        ".content .modal"
    ).innerHTML += `<div class="overlay"><div class="preloader"></div></div>`;
    var data = await buscaInformacao("consulta_cartao_obra", id);
    var foto = `<ion-icon name="camera"></ion-icon>`;
    if (data["foto"] != "") {
        foto = foto =
            `<img src="/img-obras/` + data["foto"] + `-thumb.jpeg" alt="" />`;
    }
    var data_aux = await buscaInformacao("consulta_usuarios_responsavel", "");
    var lista_responsavel = data_aux["usuarios"];
    var options1 = "";
    for (i = 0; i < lista_responsavel.length; i++) {
        options1 =
            options1 +
            `<option value="${lista_responsavel[i].ID}"` +
            (lista_responsavel[i].ID == data["responsavel_ID"]
                ? " selected"
                : "") +
            `>${lista_responsavel[i].nome} ${lista_responsavel[i].sobrenome}</option>`;
    }
    var data_aux = await buscaInformacao(
        "consulta_usuarios_responsavel_tecnico",
        ""
    );
    var lista_responsavel_tecnico = data_aux["usuarios"];
    var options2 = "";
    for (i = 0; i < lista_responsavel_tecnico.length; i++) {
        options2 =
            options2 +
            `<option value="${lista_responsavel_tecnico[i].ID}"` +
            (lista_responsavel_tecnico[i].ID == data["responsavel_tecnico_ID"]
                ? " selected"
                : "") +
            `>${lista_responsavel_tecnico[i].nome} ${lista_responsavel_tecnico[i].sobrenome}</option>`;
    }
    document.querySelector(".content .modal .overlay").innerHTML =
        `<div class="formulario_novo">
    <h3>Editar obra</h3>
    <div class="conteudo">
      <div class="formulario">
        <div class="bloco unico">
          <input type="text" id="nome" placeholder=" " value="` +
        data["nome"] +
        `" required />
          <label for="nome">Nome</label>
        </div>
        <div class="bloco duplo meio com_espacamento">
          <select id="responsavel" required>` +
        options1 +
        `</select>
          <label for="responsavel">Responsável</label>
          <div class="icone"><ion-icon name="chevron-down"></ion-icon></div>
        </div>
        <div class="bloco duplo meio">
          <select id="responsavel_tecnico" required>` +
        options2 +
        `</select>
          <label for="responsavel_tecnico">Responsável técnico</label>
          <div class="icone"><ion-icon name="chevron-down"></ion-icon></div>
        </div>
        <div class="bloco duplo meio com_espacamento">
          <input type="date" id="inicio" placeholder=" " value="` +
        data["inicio"] +
        `" required />
          <label for="inicio">Data de início</label>
        </div>
        <div class="bloco duplo meio">
          <input type="date" id="termino" placeholder=" " value="` +
        data["termino"] +
        `" required />
          <label for="termino">Previsão de término</label>
        </div>
        <div class="bloco unico">
          <input type="text" id="endereco" placeholder=" " value="` +
        data["endereco"] +
        `" required />
          <label for="endereco">Endereço</label>
        </div>
        <div class="bloco unico">
          <select id="status" required>
            <option value="em_andamento"` +
        (data["status"] == "em_andamento" ? " selected" : "") +
        `>Em andamento</option>
            <option value="finalizadas"` +
        (data["status"] == "finalizadas" ? " selected" : "") +
        `>Finalizada</option>
          </select>
          <label for="status">Status</label>
          <div class="icone"><ion-icon name="chevron-down"></ion-icon></div>
        </div>
        <div class="bloco_imagem">
          <input type="file" id="foto" accept="image/*" onchange="previsualizarImagem()" />
          <label for="foto"><div id="previsualizacao" class="imagem">` +
        foto +
        `</div><div class="legenda">Foto da obra</div></label>
        </div>
      </div>
      <div class="options">
        <button class="button confirm" onclick="acionaBotao(this,'edita_obra','escrita',` +
        id +
        `,'')">Alterar</button>
        <button class="button cancel" onclick="fecharFormularioNovo(this)">Cancelar</button>
      </div>
    </div>
  </div>`;
}

function geraFormularioNovoChecklist(id) {
    document.querySelector(".content .modal .overlay .obra").innerHTML +=
        `<div class="formulario_interno">
    <div class="conteudo">
      <div class="formulario">
        <div class="bloco">
          <input type="text" id="data" onfocus="(this.type='date')" placeholder=" " required />
          <label for="data">Data</label>
        </div>
        <div class="bloco">
          <input type="text" id="descricao" placeholder=" " required />
          <label for="descricao">Descrição</label>
        </div>
      </div>
      <div class="options">
        <button class="button confirm" onclick="acionaBotao(this,'adiciona_checklist','escrita',` +
        id +
        `,'')">Adicionar</button>
        <button class="button cancel" onclick="fecharFormularioInterno(this)">Cancelar</button>
      </div>
    </div>
  </div>`;
}

function geraFormularioNovaPendencia(id, checklist_ID) {
    document.querySelector(".content .modal .overlay .obra").innerHTML +=
        `<div class="formulario_interno">
    <div class="conteudo">
      <div class="formulario">
        <div class="bloco">
          <input type="text" id="pavimento" placeholder=" " required />
          <label for="pavimento">Pavimento</label>
        </div>
        <div class="bloco">
          <input type="text" id="comodo" placeholder=" " required />
          <label for="comodo">Cômodo</label>
        </div>
        <div class="bloco">
          <input type="text" id="motivo" placeholder=" " required />
          <label for="motivo">Motivo</label>
        </div>
      </div>
      <div class="options">
        <button class="button confirm" onclick="acionaBotao(this,'adiciona_pendencia','escrita',` +
        id +
        `,` +
        checklist_ID +
        `)">Adicionar</button>
        <button class="button cancel" onclick="fecharFormularioInterno(this)">Cancelar</button>
      </div>
    </div>
  </div>`;
}

function geraFormularioNovaAtualizacao(id) {
    document.querySelector(".content .modal .overlay .obra").innerHTML +=
        `<div class="formulario_interno">
    <div class="conteudo">
      <div class="formulario">
        <div class="bloco">
          <input type="text" id="atividades" placeholder=" " required />
          <label for="atividades">Atividades executadas</label>
        </div>
        <div class="bloco">
          <input type="text" id="ocorrencia" placeholder=" " required />
          <label for="ocorrencia">Descrição da ocorrência</label>
        </div>
        <div class="bloco">
          <input type="text" id="condicao_tempo" placeholder=" " required />
          <label for="condicao_tempo">Condição do tempo</label>
        </div>
        <div class="bloco_imagem">
          <input type="file" id="foto1" accept="image/*" onchange="previsualizarImagemAdicionarCampo(1)" />
          <label for="foto1"><div id="previsualizacao1" class="imagem"><ion-icon name="camera"></ion-icon></div></label>
        </div>
      </div>
      <div class="options">
        <button class="button confirm" onclick="acionaBotao(this,'adiciona_atualizacao','escrita',` +
        id +
        `,'')">Adicionar</button>
        <button class="button cancel" onclick="fecharFormularioInterno(this)">Cancelar</button>
      </div>
    </div>
  </div>`;
}

function geraFormularioNovaNotaFiscal(id) {
    document.querySelector(".content .modal .overlay .obra").innerHTML +=
        `<div class="formulario_interno">
    <div class="conteudo">
      <div class="options">
        <button class="button_square" onclick="fecharFormularioInterno(this); geraFormularioNovaNotaFiscalImagem(` +
        id +
        `);"><span class="icone_square"><ion-icon name="camera"></ion-icon></span>Tirar foto de uma nota fiscal</button>
        <button class="button_square" onclick="fecharFormularioInterno(this); geraFormularioNovaNotaFiscalPDF(` +
        id +
        `);"><span class="icone_square"><ion-icon name="document-attach"></ion-icon></span>Enviar uma nota fiscal em PDF</button>
      </div>
    </div>
    <div class="fechar" onclick="fecharCartao(this)"><ion-icon name="close-outline"></ion-icon></div>
  </div>`;
}

function geraFormularioNovaNotaFiscalImagem(id) {
    document.querySelector(".content .modal .overlay .obra").innerHTML +=
        `<div class="formulario_interno">
    <div class="conteudo">
      <div class="formulario">
        <div class="bloco">
          <input type="text" id="nome" placeholder=" " required />
          <label for="nome">Descrição</label>
        </div>
        <div class="bloco">
          <input type="text" id="valor" placeholder=" " oninput="this.value=this.value.replace(/[^0-9,]/g,'')" required />
          <label for="valor">Valor</label>
        </div>
        <div class="bloco_imagem centralizado">
          <input type="file" id="foto" accept="image/*" onchange="previsualizarImagemNota()" />
          <label for="foto"><div id="previsualizacao" class="imagem_nota"><ion-icon name="camera"></ion-icon></div></label>
        </div>
      </div>
      <div class="options">
        <button class="button confirm" onclick="acionaBotao(this,'adiciona_nota_fiscal_imagem','escrita',` +
        id +
        `,'')">Adicionar</button>
        <button class="button cancel" onclick="fecharFormularioInterno(this)">Cancelar</button>
      </div>
    </div>
  </div>`;
}

function geraFormularioNovaNotaFiscalPDF(id) {
    document.querySelector(".content .modal .overlay .obra").innerHTML +=
        `<div class="formulario_interno">
    <div class="conteudo">
      <div class="formulario">
        <div class="bloco">
          <input type="text" id="nome" placeholder=" " required />
          <label for="nome">Descrição</label>
        </div>
        <div class="bloco">
          <input type="text" id="valor" placeholder=" " oninput="this.value=this.value.replace(/[^0-9,]/g,'')" required />
          <label for="valor">Valor</label>
        </div>
        <div class="bloco_imagem">
          <input type="file" id="arquivo" accept="application/pdf" onchange="previsualizarNome()" />
          <label for="arquivo"><div class="icone_nota"><ion-icon name="receipt"></ion-icon></div><div id="previsualizacao" class="legenda">Nome do arquivo</div></label>
        </div>
      </div>
      <div class="options">
        <button class="button confirm" onclick="acionaBotao(this,'adiciona_nota_fiscal_pdf','arquivos',` +
        id +
        `,'')">Adicionar</button>
        <button class="button cancel" onclick="fecharFormularioInterno(this)">Cancelar</button>
      </div>
    </div>
  </div>`;
}

function geraFormularioNovoEfetivo(id) {
    document.querySelector(".content .modal .overlay .obra").innerHTML +=
        `<div class="formulario_interno">
    <div class="conteudo">
      <div class="formulario">
        <div class="bloco">
          <select id="empreiteira" onchange="geraNomeEmpresa()" required>
            <option value="">Construtora</option>
            <option value="empreiteira">Empreiteira</option>
          </select>
          <div class="icone"><ion-icon name="chevron-down"></ion-icon></div>
        </div>
        <div class="bloco">
          <input type="text" id="funcao" placeholder=" " required />
          <label for="funcao">Função</label>
        </div>
        <div id="hidden"></div>
        <div class="bloco">
          <input type="number" id="quantidade" placeholder=" " oninput="this.value=this.value.replace(/(?![0-9])./gmi,'')" required />
          <label for="quantidade">Quantidade</label>
        </div>
      </div>
      <div class="options">
        <button class="button confirm"onclick="acionaBotao(this,'cadastra_efetivo','escrita',` +
        id +
        `,'')">Adicionar</button>
        <button class="button cancel" onclick="fecharFormularioInterno(this)">Cancelar</button>
      </div>
    </div>
  </div>`;
}

function geraFormularioNovoArquivo(tipo, id) {
    document.querySelector(".content .modal .overlay .obra").innerHTML +=
        `<div class="formulario_interno">
    <div class="conteudo">
      <div class="formulario">
        <div class="bloco">
          <input type="text" id="nome" placeholder=" " required />
          <label for="nome">Descrição</label>
        </div>
        <div class="bloco_imagem">
          <input type="file" id="arquivo" accept="*/*" onchange="previsualizarNome()" />
          <label for="arquivo"><div class="icone_arquivo"><ion-icon name="document-text"></ion-icon></div><div id="previsualizacao" class="legenda">Nome do arquivo</div></label>
        </div>
      </div>
      <div class="options">
        <button class="button confirm"onclick="acionaBotao(this,'adiciona_arquivo','arquivos',` +
        id +
        `,'` +
        tipo +
        `')">Adicionar</button>
        <button class="button cancel" onclick="fecharFormularioInterno(this)">Cancelar</button>
      </div>
    </div>
  </div>`;
}

function geraFormularioNovaMaquina(id) {
    document.querySelector(".content .modal .overlay .obra").innerHTML +=
        `<div class="formulario_interno">
    <div class="conteudo">
      <div class="formulario">
        <div class="bloco">
          <input type="text" id="nome" placeholder=" " required />
          <label for="nome">Nome</label>
        </div>
        <div class="bloco">
          <input type="text" id="local" placeholder=" " required />
          <label for="local">Local de trabalho</label>
        </div>
        <div class="bloco">
          <input type="number" id="quantidade" placeholder=" " oninput="this.value=this.value.replace(/(?![0-9])./gmi,'')" required />
          <label for="quantidade">Horas trabalhadas</label>
        </div>
      </div>
      <div class="options">
        <button class="button confirm" onclick="acionaBotao(this,'adiciona_inventario','escrita',` +
        id +
        `,'maquinas_equipamentos')">Adicionar</button>
        <button class="button cancel" onclick="fecharFormularioInterno(this)">Cancelar</button>
      </div>
    </div>
  </div>`;
}

function geraFormularioNovoMaterial(id) {
    document.querySelector(".content .modal .overlay .obra").innerHTML +=
        `<div class="formulario_interno">
    <div class="conteudo">
      <div class="formulario">
        <div class="bloco">
          <input type="text" id="nome" placeholder=" " required />
          <label for="nome">Nome</label>
        </div>
        <div class="bloco">
          <input type="number" id="quantidade" placeholder=" " oninput="this.value=this.value.replace(/(?![0-9])./gmi,'')" required />
          <label for="quantidade">Quantidade</label>
        </div>
      </div>
      <div class="options">
        <button class="button confirm"onclick="acionaBotao(this,'adiciona_inventario','escrita',` +
        id +
        `,'materiais')">Adicionar</button>
        <button class="button cancel" onclick="fecharFormularioInterno(this)">Cancelar</button>
      </div>
    </div>
  </div>`;
}

function geraFormularioConfirmacaoExclusao(mensagem, action, param, param_int) {
    document.querySelector(".content .modal .overlay .obra").innerHTML +=
        `<div class="formulario_interno">
    <div class="conteudo">
      <p>` +
        mensagem +
        `</p>
      <div class="options">
        <button class="button confirm" onclick="acionaBotao(this, '` +
        action +
        `','escrita', ` +
        param +
        `,` +
        param_int +
        `)">Excluir</button>
        <button class="button cancel" onclick="fecharFormularioInterno(this)">Cancelar</button>
      </div>
    </div>
  </div>`;
}

function geraFormularioNovoColaborador() {
    document.querySelector(
        ".content .modal"
    ).innerHTML += `<div class="overlay">
  <div class="formulario_novo">
    <h3>Cadastrar colaborador</h3>
    <div class="conteudo">
      <div class="formulario">
        <div class="bloco duplo meio com_espacamento">
          <input type="text" id="nome" placeholder=" " required />
          <label for="nome">Nome</label>
        </div>
        <div class="bloco duplo meio">
          <input type="text" id="sobrenome" placeholder=" " required />
          <label for="sobrenome">Sobrenome</label>
        </div>
        <div class="bloco meio">
          <input type="text" id="matricula" placeholder=" " required />
          <label for="matricula">Matrícula</label>
        </div>
        <div class="bloco duplo meio com_espacamento">
          <select id="funcao" onchange="geraNumConselho()" required>
            <option value="" selected disabled></option>
            <option value="executivo">Executivo</option>
            <option value="financeiro">Financeiro</option>
            <option value="compras">Compras</option>
            <option value="arquiteto">Arquiteto(a)</option>
            <option value="engenheiro">Engenheiro(a)</option>
            <option value="encarregado">Encarregado/Mestre de obras</option>
          </select>
          <label for="funcao">Função</label>
          <div class="icone"><ion-icon name="chevron-down"></ion-icon></div>
        </div>
        <div id="hidden"></div>
        <div class="bloco duplo meio com_espacamento">
          <input type="tel" id="telefone" placeholder=" " oninput="this.value=this.value.replace(/(?![0-9])./gmi,'').slice(0, 11)" onblur="formataTelefone(this)" required />
          <label for="telefone">Telefone</label>
        </div>
        <div class="bloco duplo meio">
          <input type="email" id="email" placeholder=" " required />
          <label for="email">E-mail</label>
        </div>
        <div class="bloco meio">
          <input type="password" id="senha" placeholder=" " required />
          <label for="senha">Senha</label>
        </div>
        <div class="bloco_imagem">
          <input type="file" id="foto" accept="image/*" onchange="previsualizarImagem()" />
          <label for="foto"><div id="previsualizacao" class="imagem"><ion-icon name="camera"></ion-icon></div><div class="legenda">Foto do colaborador</div></label>
        </div>
      </div>
      <div class="options">
        <button class="button confirm" onclick="acionaBotao(this,'cadastra_usuario','escrita','','')">Cadastrar</button>
        <button class="button cancel" onclick="fecharFormularioNovo(this)">Cancelar</button>
      </div>
    </div>
  </div>
</div>`;
}

async function geraFormularioEditarColaborador(id) {
    document.querySelector(
        ".content .modal"
    ).innerHTML += `<div class="overlay"><div class="preloader"></div></div>`;
    var data = await buscaInformacao("consulta_cartao_usuario", id);
    var foto = `<ion-icon name="camera"></ion-icon>`;
    if (data["foto"] != "") {
        foto = foto =
            `<img src="/img-usuarios/` + data["foto"] + `.jpeg" alt="" />`;
    }
    document.querySelector(".content .modal .overlay").innerHTML =
        `<div class="formulario_novo">
    <h3>Editar colaborador</h3>
    <div class="conteudo">
      <div class="formulario">
        <div class="bloco duplo meio com_espacamento">
          <input type="text" id="nome" placeholder=" " value="` +
        data["nome"] +
        `" required />
          <label for="nome">Nome</label>
        </div>
        <div class="bloco duplo meio">
          <input type="text" id="sobrenome" placeholder=" " value="` +
        data["sobrenome"] +
        `" required />
          <label for="sobrenome">Sobrenome</label>
        </div>
        <div class="bloco meio">
          <input type="text" id="matricula" placeholder=" " value="` +
        data["matricula"] +
        `" disabled />
          <label for="matricula">Matrícula</label>
        </div>
        <div class="bloco duplo meio com_espacamento">
          <select id="funcao" onchange="geraNumConselho()" required>
            <option value="executivo" ` +
        (data["funcao"] == "executivo" ? "selected" : "") +
        `>Executivo</option>
            <option value="financeiro" ` +
        (data["funcao"] == "financeiro" ? "selected" : "") +
        `>Financeiro</option>
            <option value="compras" ` +
        (data["funcao"] == "compras" ? "selected" : "") +
        `>Compras</option>
            <option value="arquiteto" ` +
        (data["funcao"] == "arquiteto" ? "selected" : "") +
        `>Arquiteto(a)</option>
            <option value="engenheiro" ` +
        (data["funcao"] == "engenheiro" ? "selected" : "") +
        `>Engenheiro(a)</option>
            <option value="encarregado" ` +
        (data["funcao"] == "encarregado" ? "selected" : "") +
        `>Encarregado/Mestre de obras</option>
          </select>
          <label for="funcao">Função</label>
          <div class="icone"><ion-icon name="chevron-down"></ion-icon></div>
        </div>
        <div id="hidden"></div>
        <div class="bloco duplo meio com_espacamento">
          <input type="tel" id="telefone" placeholder=" " value="` +
        data["telefone"] +
        `" required />
          <label for="telefone">Telefone</label>
        </div>
        <div class="bloco duplo meio">
          <input type="email" id="email" placeholder=" " value="` +
        data["email"] +
        `" required />
          <label for="email">E-mail</label>
        </div>
        <div class="bloco_check">
          <label for="alterar_senha" class="check_radio">
            Alterar senha
            <input type="checkbox" id="alterar_senha" onchange="geraNovaSenha()" />
            <span class="checkmark"></span>
          </label>
        </div>
        <div id="campo_senha"></div>
        <div class="bloco_imagem">
          <input type="file" id="foto" accept="image/*" onchange="previsualizarImagem()" />
          <label for="foto"><div id="previsualizacao" class="imagem">` +
        foto +
        `</ion-icon></div><div class="legenda">Foto do colaborador</div></label>
        </div>
      </div>
      <div class="options">
        <button class="button confirm" onclick="acionaBotao(this,'edita_usuario','escrita',` +
        id +
        `,'')">Alterar</button>
        <button class="button cancel" onclick="fecharFormularioNovo(this)">Cancelar</button>
      </div>
    </div>
  </div>`;
    const hidden = document.getElementById("hidden");
    if (data["funcao"] == "engenheiro") {
        hidden.className = "bloco duplo meio";
        hidden.innerHTML =
            `<input type="text" id="num_conselho" placeholder=" " value="` +
            data["num_conselho"] +
            `" required />
    <label for="num_conselho">CREA</label>`;
    }
    if (data["funcao"] == "arquiteto") {
        hidden.className = "bloco duplo meio";
        hidden.innerHTML =
            `<input type="text" id="num_conselho" placeholder=" " value="` +
            data["num_conselho"] +
            `" required />
    <label for="num_conselho">CAU</label>`;
    }
}

function geraNovaSenha() {
    const alterar_senha = document.getElementById("alterar_senha").checked;
    const campo_senha = document.getElementById("campo_senha");

    if (alterar_senha) {
        campo_senha.className = "bloco duplo meio";
        campo_senha.innerHTML = `<input type="password" id="senha" placeholder=" " required />
    <label for="senha">Nova senha</label>`;
    } else {
        campo_senha.className = "";
        campo_senha.innerHTML = "";
    }
}

function geraNumConselho() {
    const funcao = document.getElementById("funcao").value;
    const hidden = document.getElementById("hidden");

    hidden.className = "";
    hidden.innerHTML = "";

    if (funcao == "engenheiro") {
        hidden.className = "bloco duplo meio";
        hidden.innerHTML = `<input type="text" id="num_conselho" placeholder=" " required />
    <label for="num_conselho">CREA</label>`;
    }
    if (funcao == "arquiteto") {
        hidden.className = "bloco duplo meio";
        hidden.innerHTML = `<input type="text" id="num_conselho" placeholder=" " required />
    <label for="num_conselho">CAU</label>`;
    }
}

function geraNomeEmpresa() {
    const empreiteira = document.getElementById("empreiteira").value;
    const hidden = document.getElementById("hidden");

    if (empreiteira == "construtora") {
        hidden.className = "";
        hidden.innerHTML = "";
    } else {
        hidden.className = "bloco";
        hidden.innerHTML = `<input type="text" id="empresa" placeholder=" " required />
    <label for="empresa">Nome da empresa</label>`;
    }
}

function previsualizarNome() {
    const preview = document.getElementById("previsualizacao");
    const file = document.getElementById("arquivo").files[0];

    preview.innerHTML = file.name;
}

function gray(imgObj) {
    var canvas = document.createElement("canvas");
    var canvasContext = canvas.getContext("2d");

    var imgW = imgObj.width || imgObj.naturalWidth;
    var imgH = imgObj.height || imgObj.naturalHeight;
    canvas.width = imgW;
    canvas.height = imgH;

    canvasContext.drawImage(imgObj, 0, 0);
    var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);

    for (var y = 0; y < imgPixels.height; y++) {
        for (var x = 0; x < imgPixels.width; x++) {
            var i = y * 4 * imgPixels.width + x * 4;
            var avg =
                (imgPixels.data[i] +
                    imgPixels.data[i + 1] * 1.5 +
                    imgPixels.data[i + 2] * 2) /
                3;
            imgPixels.data[i] = avg;
            imgPixels.data[i + 1] = avg;
            imgPixels.data[i + 2] = avg;
        }
    }
    canvasContext.putImageData(
        imgPixels,
        0,
        0,
        0,
        0,
        imgPixels.width,
        imgPixels.height
    );
    return canvas.toDataURL();
}

function previsualizarImagemNota() {
    const preview = document.getElementById("previsualizacao");
    const file = document.getElementById("foto").files[0];
    const reader = new FileReader();
    var img = new Image();
    reader.addEventListener(
        "load",
        function () {
            img.src = reader.result;
        },
        false
    );
    img.addEventListener(
        "load",
        function () {
            preview.className = "imagem_nota_ativa";
            preview.innerHTML =
                `<div class="texto_topo">Verifique se a foto está legível</div><img src="` +
                gray(img) +
                `" alt="" />`;
        },
        false
    );

    if (file) {
        reader.readAsDataURL(file);
    }
}

function previsualizarImagem() {
    const preview = document.getElementById("previsualizacao");
    const file = document.getElementById("foto").files[0];
    const reader = new FileReader();

    reader.addEventListener(
        "load",
        function () {
            preview.innerHTML = `<img src="` + reader.result + `" alt="" />`;
        },
        false
    );

    if (file) {
        reader.readAsDataURL(file);
    }
}

function previsualizarImagemAdicionarCampo(n) {
    const preview = document.getElementById("previsualizacao" + n);
    const fileField = document.getElementById("foto" + n);
    const file = fileField.files[0];
    const reader = new FileReader();
    var new_n = n + 1;
    reader.addEventListener(
        "load",
        function () {
            preview.innerHTML = `<img src="` + reader.result + `" alt="" />`;
            fileField.parentElement.innerHTML +=
                `<input type="file" id="foto` +
                new_n +
                `" accept="image/*" onchange="previsualizarImagemAdicionarCampo(` +
                new_n +
                `)" />
      <label for="foto` +
                new_n +
                `"><div id="previsualizacao` +
                new_n +
                `" class="imagem"><ion-icon name="camera"></ion-icon></div></label>`;
        },
        false
    );

    if (file) {
        reader.readAsDataURL(file);
    }
}

function formataData(data) {
    var ano = data.split("-")[0];
    var mes = data.split("-")[1];
    var dia = data.split("-")[2];
    return ("0" + dia).slice(-2) + "/" + ("0" + mes).slice(-2) + "/" + ano;
}

function formataTelefone(field) {
    var entrada = field.value;
    const isCelular = entrada.length === 11;
    if (isCelular) {
        field.value = entrada.replace(
            /(\d{2})(\d{5})(\d{4})/,
            function (regex, argumento1, argumento2, argumento3) {
                return "(" + argumento1 + ") " + argumento2 + "-" + argumento3;
            }
        );
    } else {
        field.value = entrada.replace(
            /(\d{2})(\d{4})(\d{4})/,
            function (regex, argumento1, argumento2, argumento3) {
                return "(" + argumento1 + ") " + argumento2 + "-" + argumento3;
            }
        );
    }
}

function copiarLink(link, element) {
    (async () => {
        await navigator.clipboard.writeText(
            location.origin + "/arquivos/" + link
        );
    })();
    element.querySelector(".legenda").innerHTML = " copiado";
    setTimeout(function () {
        element.querySelector(".legenda").innerHTML = " copiar link";
    }, 2000);
}

function atualizaPagina() {
    switch (true) {
        case window.location.pathname == "/":
            geraDash();
            break;
        case window.location.pathname == "/obras/":
            geraObras("em_andamento");
            break;
    }
}

function fecharModal(element) {
    element.parentElement.parentElement.parentElement.remove();
}
function fecharCartao(element) {
    element.parentElement.remove();
}
function fecharOverlay(element) {
    element.remove();
}
function fecharFormularioNovo(element) {
    element.parentElement.parentElement.parentElement.parentElement.remove();
}
function fecharFormularioInterno(element) {
    element.parentElement.parentElement.parentElement.remove();
}
