const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'actionstore',
    database: 'actionstore'
});

// Middleware para permitir CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conexão com o banco de dados MySQL estabelecida');
});

app.get('/produtos', (req, res) => {
    const query = 'SELECT * FROM produtos';
    db.query(query, (err, result) => {
        if (err) {
            res.status(500).send('Erro ao obter produtos do banco de dados');
        } else {
            res.json(result);
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

// Requisições de compra e remoção de itens do carrinho.
app.post('/comprar', (req, res) => {
    const { nome, preco } = req.body;
    const query = 'INSERT INTO produtos (nome, preco) VALUES (?, ?)';
    db.query(query, [nome, preco], (err, result) => {
        if (err) {
            res.status(500).send('Erro ao adicionar produto ao carrinho');
        } else {
            res.status(200).send('Produto adicionado ao carrinho com sucesso');
        }
    });
});

app.post('/remover', (req, res) => {
    const { id } = req.body;
    const query = 'DELETE FROM produtos WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).send('Erro ao remover produto do carrinho');
        } else {
            res.status(200).send('Produto removido do carrinho com sucesso');
        }
    });
});

// Endpoint para lidar com o cadastro de clientes
app.post('/api/cadastro', (req, res) => {
    const cliente = req.body;

    db.query('INSERT INTO clientes SET ?', cliente, (err, results) => {
        if (err) {
            console.error('Erro ao cadastrar cliente:', err);
            res.status(500).json({ message: 'Erro ao cadastrar cliente' });
            return;
        }
        console.log('Cliente cadastrado com sucesso');
        res.status(200).json({ message: 'Cliente cadastrado com sucesso' });
    });
});

// Endpoint para lidar com o login de clientes
app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;

    db.query('SELECT nome FROM clientes WHERE email = ? AND senha = ?', [email, senha], (err, results) => {
        if (err) {
            console.error('Erro ao validar login:', err);
            res.status(500).json({ message: 'Erro ao validar login' });
            return;
        }
        if (results.length > 0) {
            const nome = results[0].nome;
            res.status(200).json({ nome });
        } else {
            res.status(401).json({ message: 'E-mail ou senha incorretos' });
        }
    });
});
