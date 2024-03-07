document.addEventListener("DOMContentLoaded", function() {
    const parametrosURL = new URLSearchParams(window.location.search);
    const nomeItem = parametrosURL.get('nome');
    const precoItem = parametrosURL.get('preco');

    if (nomeItem && precoItem) {
        adicionarItemAoCarrinho(nomeItem, precoItem);
    }
});

function adicionarItemAoCarrinho(nome, preco) {
    const listaCarrinho = document.getElementById('lista-carrinho');
    const novoItem = document.createElement('li');
    novoItem.textContent = `${nome} - R$ ${preco}`;
    listaCarrinho.appendChild(novoItem);
}
