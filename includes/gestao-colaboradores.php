    <div class="alerta"></div>
    <?php
        include "user.php";
    ?>
    <div class="content">
      <?php
          include "header.php";
          include "nav.php";
      ?>
      <h1>Gestão de colaboradores</h1>
      <div class="abas">
        <a href="/perfil/" class="botao_voltar"
          ><ion-icon name="chevron-back-circle"></ion-icon
          ><span class="legenda">voltar</span></a
        >
        <div class="adicionar" onclick="geraFormularioNovoColaborador()">
          <div class="icone_botao"><ion-icon name="add"></ion-icon></div>
          Novo<span>&nbsp;colaborador</span>
        </div>
      </div>
      <div class="colaboradores">
        <div class="preloader"></div>
      </div>
      <div class="modal"></div>
    </div>