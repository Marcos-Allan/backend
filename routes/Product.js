const express = require('express')
const router = express.Router()

const upload = require('../config/multer')

const ProductController = require('../controllers/ProductController')

router.get('/', ProductController.message)

router.get('/products', ProductController.getAll)
router.get('/product/:id', ProductController.getOne)

router.post('/create', upload.single('file'), ProductController.create)

router.put('/product/update/:id', ProductController.update)

router.delete('/product/delete/:id', ProductController.delete)

module.exports = router