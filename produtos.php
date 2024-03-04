<?php
// Conectar ao banco de dados SQLite
$db = new SQLite3('produtos.sql');

// Query para recuperar os produtos
$result = $db->query('SELECT * FROM produtos');

// Exibir os produtos
while ($row = $result->fetchArray()) {
    echo '<div class="produto">';
    echo '<img src="' . $row['imagem'] . '" alt="' . $row['nome'] . '">';
    echo '<p class="nome-produto">' . $row['nome'] . '</p>';
    echo '<p class="rate">&#9733; &#9733; &#9733; &#9733; &#9733;</p>';
    echo '<p class="preco-produto"><span>R$</span>' . number_format($row['preco'], 2) . '</p>';
    echo '</div>';
}

// Fechar a conexão com o banco de dados
$db->close();
?>
