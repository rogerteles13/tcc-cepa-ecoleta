const Sequelize = require("sequelize")
const sequelize = new Sequelize("ecoleta", "root", "12345678", {
    host: "localhost",
    dialect: "mysql"
})

/*module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}*/

/*sequelize.authenticate().then(() => {
    console.log("Conectado com sucesso!")
}).catch((err) => {
    console.log("Erro na coneção!")
})*/

const Entidade = sequelize.define("entidades", {

    image: {
        type: Sequelize.TEXT
    },
    name: {
        type: Sequelize.TEXT
    },
    address: {
        type: Sequelize.TEXT
    },
    address2: {
        type: Sequelize.TEXT
    },
    state: {
        type: Sequelize.TEXT
    },
    city: {
        type: Sequelize.TEXT
    },
    items: {
        type: Sequelize.TEXT
    }
    
})

//Entidade.sync({force: true})
  