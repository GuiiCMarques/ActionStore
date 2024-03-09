document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector(".navbar");
    const menuButton = document.querySelector(".botao-menu");

    menuButton.addEventListener("click", () => {
        navbar.classList.toggle("mostrar-menu");
    });

    function adicionarAoCarrinho(nome, preco) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho.push({ nome: nome, preco: preco });
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        alert('Item adicionado ao carrinho!');
    }

    function atualizarCarrinho() {
        let carrinhoBody = document.getElementById('carrinho-body');
        carrinhoBody.innerHTML = '';
        let carrinho = JSON.parse(localStorage.getItem('carrinho'));
        if (carrinho && carrinho.length > 0) {
            let subtotal = 0;
            carrinho.forEach(function (produto, index) {
                let newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>
                        <div class="product">
                            <img src="imagem_do_produto.jpg" alt="Imagem do Produto">
                            <div class="info">
                                <div class="name">${produto.nome}</div>
                                <div class="category">Categoria</div> 
                            </div>
                        </div>
                    </td>
                    <td>R$ ${produto.preco.toFixed(2)}</td>
                    <td>
                        <div class="qty">
                            <button><i class="bx bx-minus"></i></button>
                            <span>1</span>
                            <button><i class="bx bx-plus"></i></button>
                        </div>
                    </td>
                    <td>R$ ${produto.preco.toFixed(2)}</td>
                    <td>
                        <button class="remove-item" data-index="${index}">Remover</button>
                    </td>
                `;
                carrinhoBody.appendChild(newRow);
                subtotal += produto.preco;
            });
            document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
            document.getElementById('total').textContent = `R$ ${subtotal.toFixed(2)}`;
        }
    }

    function removerItemDoCarrinho(index) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho'));
        carrinho.splice(index, 1);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinho();
    }

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-item')) {
            let index = event.target.getAttribute('data-index');
            removerItemDoCarrinho(index);
        }
    });

    window.addEventListener('DOMContentLoaded', function () {
        atualizarCarrinho();
    });

    const parametrosURL = new URLSearchParams(window.location.search);
    const nomeItem = parametrosURL.get('nome');
    const precoItem = parametrosURL.get('preco');

    if (nomeItem && precoItem) {
        adicionarItemAoCarrinho(nomeItem, precoItem);
    }
});

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