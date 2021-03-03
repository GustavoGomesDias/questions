const Sequelize = require('sequelize');
const connection = require('./database');

// define => define a tabela com o nome pergunta
const Perguntas = connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}); // CAbia um json de opções ainda

// sync => se não existir uma tabela pergunta. ele cria
// force: false => se a tablea já existir, ele não cria
Perguntas.sync({force: false}).then();

module.exports = Perguntas;

/* Sequelize

    allowNulll => não deixa o campo ser vazio
    STRING => textos curtos
    TEXT => textos longos
*/