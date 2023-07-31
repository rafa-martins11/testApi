require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express ()


const Person = require ('./models/Person')
// config de ler json
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//rotas da APÌ

//rota pessoa
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

// config endpoint inicial
app.get('/', (req, res)=> {
    // mostrar req
    res.json({message: 'Olá Express!'})
})

app.get('/olamundo', (req, res)=> {
    // mostrar req
    res.json({mensagem: 'Olá Mundo! Este é o meu endpoint'})
})

app.get('/olamundo', (req, res)=> {
    res.json({mensagem: 'Olá Mundo! Este é o meu endpoint'})
})

//Conectar ao MongoDB e entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PWD = encodeURIComponent(process.env.DB_PWD)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PWD}@cluster0.tgcp8u6.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    console.log('Conectado ao MongoDB!')
    app.listen(3000)
})
.catch((err) => console.log(err))
