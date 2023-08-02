// config inicial
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

//rotas da API
app.post('/person', async (req, res) => {

    const {name, salary, approved, age} = req.body
    const person = {
        name,
        salary,
        approved,
        age
    }
    //validacao
    if(!name || !salary || !age) {
        res.status(422).json({error : 'Nome, salário e idade são campos obrigatórios!'})
    }

    // persistencia
   // console.log(name+ " - " + salary + " - " + approved + " - " + age)
    try{
        Person.create(person)
        res.status(201).json({message: 'Pessoa Inserida com sucesso!'})
    } catch(error) {
        res.status(500).json({error:error})
    }

})

// config endpoint inicial
app.get('/', (req, res)=> {
    // mostrar req
    res.json({message: 'Olá Express!'})
})

app.get('/olamundo', (req, res)=> {
    // mostrar req
    res.json({mensagem: 'Olá Mundo! Este é o meu endpoint'})
})

//Conectar ao MongoDB e entregar uma porta
const DB_USER = 'ramartins'
const DB_PWD = encodeURIComponent('DelLbt5uG3TgoXmw')

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PWD}@cluster0.tgcp8u6.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    console.log('Conectado ao MongoDB!')
    app.listen(3000)
})
.catch((err) => console.log(err))
