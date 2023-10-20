<?php
session_start();
require("api/conexao.php");
if (!isset($_SESSION["logged"]) && !is_array($_SESSION["logged"]) && $_GET["p"] != "entrar") {
  echo "<script>window.location = '/entrar/'</script>";
}
if (isset($_SESSION["logged"]) && is_array($_SESSION["logged"]) && $_GET["p"] == "entrar") {
  echo "<script>window.location = '/'</script>";
}
if (isset($_SESSION["logged"]) && is_array($_SESSION["logged"])) {
  $id = $_SESSION["logged"][0];
  $papel = $_SESSION["logged"][1];
  $nome = $_SESSION["logged"][2];
  $sobrenome = $_SESSION["logged"][3];
  $matricula = $_SESSION["logged"][4];
}
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Empresa</title>
  <link rel="stylesheet" href="/styles/main.css" />
</head>

<body>
  <?php
  if (isset($_GET["p"])) {
    $page = $_GET["p"];
    switch (true) {
      case ($page == "obras"):
        include "includes/obras.php";
        break;
      case ($page == "perfil"):
        include "includes/perfil.php";
        break;
      case ($page == "gestao-colaboradores"):
        include "includes/gestao-colaboradores.php";
        break;
      case ($page == "sair"):
        include "includes/sair.php";
        break;
      case ($page == "entrar"):
        include "includes/entrar.php";
        break;
    }
  } else {
    include "includes/dash.php";
  }
  ?>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.6.0/chart.min.js" integrity="sha512-GMGzUEevhWh8Tc/njS0bDpwgxdCJLQBWG3Z2Ct+JGOpVnEmjvNx6ts4v6A2XJf1HOrtOsfhv3hBKpK9kE5z8AQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
  <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
  <script src="/scripts/main.js"></script>
</body>

</html>