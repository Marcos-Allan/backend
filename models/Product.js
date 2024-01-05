const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
    price: String,
    descont: String,
    image: String,
    description: String,
    stars: String
})

module.exports =  Product