const Book = require('../models/Book')

exports.createBook = async (req, res, next)=>{console.log(req.body);
console.log(req.file);
    try {
       const bookObject = JSON.parse(req.body.book);
        delete bookObject._id;

        const book = new Book({
            ...bookObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
        await book.save()
        res.status(201).json({message : 'Objet enregistré'})
  }catch(error){
        res.status(400).json({error})

}}

exports.getAllBooks = async (req, res, next) => {
    try {
         const books = await Book.find()
         res.status(200).json(books)
    }catch(error){
        res.status(400).json({error})
    }};

exports.getOneBook = async (req, res, next)=> {
    try {
        const book = await Book.findOne({_id: req.params.id})
        res.status(200).json(book)
    }catch(error){
        res.status(400).json({error})
    }
}

exports.modifyBook = async(req, res, next)=> {
    try{
        await Book.updateOne({ _id : req.params.id}, {...req.body, _id : req.params.id}) 
        res.status(200).json({message : 'Livre modifié'})
    }catch(error){
        res.status(400).json({error})
    }
}

exports.deleteBook = async(req, res, next)=> {
    try{
        await Book.deleteOne({_id : req.params.id})
        res.status(200).json({message : 'Livre supprimé'})
    }catch(error){
        res.status(400).json({error})
    }
}