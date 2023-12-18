const express = require('express')
const router = express.Router()

const upload = require('../config/multer')

const ProductController = require('../controllers/ProductController')

router.get('/', ProductController.getAll)
router.get('/product/:id', ProductController.getOne)

router.post('/', upload.single('file'), ProductController.create)

router.put('/product/:id', ProductController.update)

router.delete('/product/:id', ProductController.delete)

module.exports = router