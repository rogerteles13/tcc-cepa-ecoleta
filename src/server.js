const express = require("express")
const server = express()
const bodyParser = require("body-parser")


// pegar o banco de dados Mysql
//const create-point = require("./database/db.js")

// configurar pasta publica
server.use(express.static("public"))

// habilitar o uso do req.body na nossa aplicação
//server.use(express.urlencoded({ extended: true }))

//habilitar o bodyparser
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())


// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


// configurar caminhos da minha aplicação
// página inicial
// req: Requisição
// res: Resposta
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um título"})
})



server.get("/create-point", (req, res) => {

    // req.query: Query Strings da nossa url
    // console.log(req.query)


    return res.render("create-point.html")
})

//dados do formuláro para o cadstro

server.post("/savepoint", function(req, res){
    db.create({
        image: req.body.nome,
        name: req.body.valor,
        address: req.body.valor,
        address2: req.body.valor,
        state: req.body.valor,
        city: req.body.valor,
        items: req.body.valor,
    }).then(function(){
        res.redirect('/index.html')
        //res.send("Pagamento cadastro com sucesso!")
    }).catch(function(erro){
        res.send("Erro de cadastro!" + erro)
    })
    
})

server.post("/savepoint", (req, res) => {

    // req.body: O corpo do nosso formulário
    // console.log(req.body)

    // inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)

})



server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == "") {
        // pesquisa vazia
        return res.render("search-results.html", { total: 0})
    }

    // pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        // mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total})
    })
})


// ligar o servidor
server.listen(process.env.PORT || 3000)