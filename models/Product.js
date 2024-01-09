const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
    price: String,
    descont: String,
    description: String,
    stars: String,
    image: String,
    keywords: String,
})

module.exports =  Product