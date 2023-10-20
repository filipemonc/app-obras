    <div class="alerta"></div>
    <?php
    include "user.php";
    ?>
    <div class="content">
      <?php
      include "header.php";
      include "nav.php";
      ?>
      <h1>Perfil</h1>
      <div class="perfil">
        <div class="conteudo">
          <div class="imagem"><?php
                              $conexaoClasse = new Conexao();
                              $conexao = $conexaoClasse->conectar();
                              $query = $conexao->prepare("SELECT foto FROM usuarios WHERE ID = ?");
                              $query->execute(array($id));
                              $result = $query->fetchAll(PDO::FETCH_ASSOC)[0]["foto"];
                              if ($result == "") {
                                echo '<ion-icon name="camera"></ion-icon>';
                              } else {
                                echo '<img src="/img-usuarios/' . $result . '.jpeg" alt="" />';
                              }
                              ?></div>
          <h2><?php echo $nome . " " . $sobrenome; ?></h2>
          <p><?php echo $matricula; ?></p>
        </div>
        <div class="formulario">
          <div class="bloco">
            <input type="password" id="senha_atual" placeholder=" " required />
            <label for="senha_atual">Senha atual</label>
          </div>
          <div class="bloco">
            <input type="password" id="nova_senha" placeholder=" " required />
            <label for="nova_senha">Nova senha</label>
          </div>
          <div class="bloco">
            <input type="password" id="confirma_nova_senha" placeholder=" " required />
            <label for="confirma_nova_senha">Confirmar nova senha</label>
          </div>
        </div>
        <div class="options">
          <button class="button confirm" onclick="acionaBotao(this,'edita_senha','escrita',<?php echo $id; ?>,'')">Alterar</button>
          <a href="/" class="button cancel">Cancelar</a>
        </div>
        <?php if ($papel == 0 || $papel == 1) : ?>
          <a href="/gestao-colaboradores/" class="botao_gestao_colaboradores">
            <div class="icone">
              <ion-icon name="people-outline"></ion-icon>
            </div>
            <p>Gestão de colaboradores</p>
          </a>
        <?php endif; ?>
      </div>
    </div>