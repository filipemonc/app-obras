    <div class="alerta"></div>
    <?php
        include "user.php";
    ?>
    <div class="content">
      <?php
          include "header.php";
          include "nav.php";
      ?>
      <h1>Sair</h1>
      <div class="exit">
        <p>Tem certeza que deseja sair e encerrar sua sessão?</p>
        <div class="options">
          <a href="/api/encerrar/" class="button confirm">Sair</a>
          <a href="/" class="button cancel">Cancelar</a>
        </div>
      </div>
    </div>