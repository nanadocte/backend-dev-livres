const express = require('express')
const mongoose = require('mongoose');
const app = express()
const Book = require('./models/Book')

mongoose.connect('mongodb+srv://projetbook:projetbook@cluster0.ghzbosi.mongodb.net/?appName=Cluster0',)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => {
    console.error('La connexion a échoué') 
  console.error(error)
});

app.use(express.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get('/api/books', async (req, res, next) => {
    try {
         const books = await Book.find()
         res.status(200).json(books)
    }catch(error){
        res.status(400).json({error})
    }});


app.get('/api/books/:id', async (req, res, next)=> {
    try {
        const book = await Book.findOne({_id: req.params.id})
        res.status(200).json(book)
    }catch(error){
        res.status(400).json({error})
    }
})

app.post('/api/books', async (req, res, next)=>{
     try {
    const {_id, ...data} = req.body
    const book = new Book (data)
    await book.save()
    res.status(201).json({message : 'Objet enregistré'})
  }catch(error){
    res.status(400).json({error})

}})

module.exports = app