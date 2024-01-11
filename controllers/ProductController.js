const Product = require('../models/Product')

exports.create = async (req, res) => {
    try {
        const { price, descont, description, stars, image,
        keywords } = req.body

        const file = req.file;

        const product = new Product({
            price,
            descont,
            description,
            stars,
            keywords,
            image: file ? process.env.SERVER_URL+'/'+file.path : image
        })

        await product.save()

        res.json({ product, msg: 'Produto cadastrado com sucesso!' })

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

exports.message = async (req, res) => {
    res.send('ROTA CONSUMIDA')
}

exports.update = async (req, res) => {
    const id = req.params.id
    const product = await Product.findByIdAndUpdate(id, {
      image: req.body.image,
      price: req.body.price,
      descont: req.body.descont,
      description: req.body.description,
      stars: req.body.stars,
      keywords: req.body.keywords,
    })
    res.send(product)   
}

exports.delete = async (req, res) => {
    const id = req.params.id
    const product = await Product.findByIdAndDelete(id)
    res.send(product)   
}

exports.getPage = async (req, res) => {

    const page = req.query.page || 1
    const limit = 4
    const keyword = req.query.keyword;

    const keywordRegex = new RegExp(keyword, 'i');
    
    const products = await Product.find({ keywords: keywordRegex })
    .skip((page - 1) * limit)
    .limit(limit)

    res.send(products)
}