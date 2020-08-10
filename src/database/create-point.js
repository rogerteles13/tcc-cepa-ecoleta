const db = require('./db')

const Entidades = db.sequelize.define('entidades', {
    image: {
        type: db.Sequelize.TEXT
    },
    name: {
        type: db.Sequelize.TEXT
    }
    address: {
        type: db.Sequelize.TEXT
    }
    address2: {
        type: db.Sequelize.TEXT
    }
    state: {
        type: db.Sequelize.TEXT
    }
    city: {
        type: db.Sequelize.TEXT
    }
    items: {
        type: db.Sequelize.TEXT
    }


})


//Criar a tabela
//Create-point.sync({force: true})

module.exports = create-point