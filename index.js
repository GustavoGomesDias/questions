const express = require('express');
const app = express();


// Seto que o motor de html que vou usar é o ejs
app.set('view engine', 'ejs');

// Para usar arquivos estáticos
// public é o nome da pasta q guarda esses arquivos no mercado
app.use(express.static('public'));

// 02/03/2021 o body-parser já tá dentro do express, então não é mais necessário
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// Rotas
app.get('/', (req, res) => {

    res.render("index");
});

app.get('/perguntar', (req, res) => {
    
    res.render("perguntar")
});

// Rota pra receber os dados do formulário. Como o form tem método POST, aqui na rota também tem que ser POST
app.post("/salvarpergunta", (req, res) => {
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;
    res.send("Nome " + titulo + ", " + "Descrição " + descricao);
});

app.listen(8080, () => {
    console.log("Server is running!");
});