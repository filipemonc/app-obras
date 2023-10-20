    <div class="alerta"></div>
    <?php
    include "user.php";
    ?>
    <div class="content">
      <?php
      include "header.php";
      include "nav.php";
      ?>
      <h1>Obras</h1>
      <div class="abas nivel_obras">
        <ul>
          <li id="em_andamento" onclick="geraObras('em_andamento')">
            Em andamento
          </li>
          <li id="finalizadas" onclick="geraObras('finalizadas')">
            Finalizadas
          </li>
        </ul>
        <?php if ($papel == 0 || $papel == 1) : ?>
          <div class="adicionar" onclick="geraFormularioNovaObra()">
            <div class="icone_botao">
              <ion-icon name="add"></ion-icon>
            </div>
            Nova<span>&nbsp;obra</span>
          </div>
        <?php endif; ?>
      </div>
      <div class="obras">
        <div class="preloader"></div>
      </div>
      <div class="modal"></div>
    </div>