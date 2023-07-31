// config inicial
const express = require('express')
const app = express ()

// config de ler json
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())


// config endpoint inicial
app.get('/', (req, res)=> {
    // mostrar req

    res.json({message: 'Olá Express!'})
})

app.get('/olamundo', (req, res)=> {
    // mostrar req
    res.json({mensagem: 'Olá Mundo! Este é o meu endpoint'})
})

// entregar uma porta
app.listen(3000)