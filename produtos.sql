CREATE TABLE produtos (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    imagem TEXT,
    avaliacao INTEGER,
    preco DECIMAL(10,2)
);

INSERT INTO produtos (nome, imagem, avaliacao, preco) VALUES
    ('Psiquiconauta', 'imagens/produto4.jpg', 5, 80.00),
    ('Heroe of The Sun', 'imagens/produto5.jpg', 5, 80.00),
    ('Vulcano', 'imagens/produto6.jpg', 5, 80.00),
    ('Wolfbeast', 'imagens/produto7.jpg', 5, 80.00),
    ('Joker', 'imagens/produto8.jpg', 5, 80.00),
    ('Sword Skull', 'imagens/produto9.jpg', 5, 80.00),
    ('The Dracko', 'imagens/produto10.jpg', 5, 80.00),
    ('Fireman', 'imagens/produto1.jpg', 5, 80.00);
