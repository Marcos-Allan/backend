const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

const port = process.env.PORT || 3000
app.use(express.json())
app.use(cors())

const productRouter = require('./routes/Product')

app.use('/', productRouter)

app.use('/uploads', express.static('uploads'))

app.listen(port, () => {
    console.log('server initialized')
    require('./db')
})
