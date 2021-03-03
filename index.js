const express = require('express');
const app = express();
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');


// Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o DB");
    })
    .catch((err) => {
        console.log(err);
    });

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
    // findAll = SELECT * FROM
    Pergunta
        .findAll({ raw: true, order: [
            ['id', 'desc'] // ASC = crescente | DESC = decrescente (aqui é pra ordenar)
        ] })
        .then(perguntas => {
            // Tô enviando as peguntas para a renderização da /, agora eu posso usa-la no html
            res.render("index", {
                perguntas: perguntas
            });
        }).catch(err => console.log(err));
});

// raw: true => seta pra trazer apenas os dados

app.get('/perguntar', (req, res) => {
    
    res.render("perguntar")
});

// Rota pra receber os dados do formulário. Como o form tem método POST, aqui na rota também tem que ser POST
app.post("/salvarpergunta", (req, res) => {
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;

    // create realiza o INSERT
    Pergunta.create({
        titulo: titulo,
        descricao: descricao 
    }).then(() => {
        res.redirect("/");
    }).catch(err => console.log(err));

});

app.get('/pergunta/:id', (req, res) => {
    const id = req.params.id;

    // findOne => método do sequelize que busca 1 dado
    Pergunta.findOne({
        where: {
            id: id
        }
    }).then(pergunta => {
      if(pergunta != undefined){
        
        Resposta.findAll({
            where: {perguntaId : pergunta.id},
            order: [
                ['id', 'DESC']
            ]
        }).then(respostas =>{
            res.render('pergunta', {
                pergunta: pergunta,
                respostas: respostas
            });
        });
      }else{
        res.redirect('/');
      }
    });
});

app.post('/responder', (req, res) => {
    const corpo = req.body.corpo;
    const perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect('/pergunta/'+perguntaId);
    }).catch(err => console.log(err));
});

app.listen(8080, () => {
    console.log("Server is running!");
});