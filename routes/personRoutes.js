const router = require('express').Router()
const Person = require('../models/Person')

router.post('/', async (req, res) => {

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
    try {
        Person.create(person)
        res.status(201).json({message: 'Pessoa Inserida com sucesso!'})
    } catch(error) {
        res.status(500).json({error:error})
    }

})

router.get('/', async (req, res) => {
    try {
        const people = await Person.find()

        res.status(200).json(people)
    } catch(error){
        res.status(500).json({error:error})
    }
})

//resgatar registro por id
router.get('/:id', async (req, res) =>{
    const id = req.params.id
    
    try {

        const person = await Person.findOne({_id:id})

        if(!person){
            res.status(422).json({message:'O usuário não existe'})
            return
        }

        res.status(200).json(person)

    } catch(error){
        res.status(500).json({error:error})
    }
})

//atualizar  / patch por _id
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const { name, salary, approved, age } = req.body

    const person = {
        name,
        salary,
        approved,
        age
    }
    
    try {
        const updatedPerson = await Person.updateOne({_id: id}, person)

        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({message: 'Usuário não encontrado!'})
            return
        }
        res.status(200).json(person)
    } catch (error){
        res.status(500).json({error:error})
    }

})

//deletar registro por id
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try{

        const person = await Person.findOne({_id:id})

        if(!person){
            res.status(422).json({message:'O usuário não existe!'})
            return
        }

        deletePerson = await Person.deleteOne({_id: id})

        if (deletePerson.matchedCount === 0){
            res.status(422).json({message: 'O usuário foi deletado com sucesso!'})
            return
        }
        
        res.status(200).json({message: 'Deletado Successo!'})

    }catch(error){
        res.status(500).json({error:error})
    }

})

module.exports = router;