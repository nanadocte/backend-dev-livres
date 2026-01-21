const express = require('express')
const router = express.Router()
const bookCtrl = require('../controllers/book')
const auth = require('../midlleware/auth')


router.post('/', auth, bookCtrl.createBook)

router.get('/', bookCtrl.getAllBooks)

router.get('/:id', bookCtrl.getOneBook)

router.put('/:id', auth, bookCtrl.modifyBook)

router.delete('/:id', auth, bookCtrl.deleteBook)


module.exports = router
