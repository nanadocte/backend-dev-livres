const express = require('express')
const router = express.Router()
const bookCtrl = require('../controllers/book')
const auth = require('../midlleware/auth')
const multer = require('../midlleware/multer-config')


router.post('/', auth, multer, bookCtrl.createBook)

router.get('/', bookCtrl.getAllBooks)

router.get('/:id', bookCtrl.getOneBook)

router.put('/:id', auth, multer, bookCtrl.modifyBook)

router.delete('/:id', auth, bookCtrl.deleteBook)

router.post('/:id/rating', auth, bookCtrl.addRating)

module.exports = router
