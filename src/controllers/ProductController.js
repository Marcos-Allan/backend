const Product = require('../models/Product')

exports.create = async (req, res) => {
    try {
        const { price, descont, image } = req.body

        const file = req.file;

        const product = new Product({
            price,
            descont,
            image: file ? 'http://localhost:3000/'+file.path : image
        })

        await product.save()

        res.json({ product, msg: 'Imagem do Produto salva' })

    } catch (error) {
        res.status(500).send(error)
    }
}

exports.getAll = async (req, res) => {
    const products = await Product.find()
    res.send(products)
}

exports.getOne = async (req, res) => {
    const id = req.params.id
    const products = await Product.findById(id)
    res.send(products)
}

exports.update = async (req, res) => {
    const id = req.params.id
    const product = await Product.findByIdAndUpdate(id, {
      image: req.body.image,
      price: req.body.price,
      descont: req.body.descont
    })
    res.send(product)   
}

exports.delete = async (req, res) => {
    const id = req.params.id
    const product = await Product.findByIdAndDelete(id)
    res.send(product)   
}

exports.getOne