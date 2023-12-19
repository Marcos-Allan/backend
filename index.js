const express = require('express')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
require('dotenv').config()

const app = express()

require('./auth')

const port = process.env.PORT || 3000
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: 'GET,POST,PUT,DELETE'
}))

// PASSPORT OAUTH GOOGLE

function isLoggeIn(req, res, next){
    req.user ? next() : res.sendStatus(401)
}

app.get('/auth/google',//REDIRECIONAR O USUÁRIO PARA ESSA JANELA
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(passport.initialize())
app.use(passport.session())

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/protected',
        failureRedirect: '/auth/google/failure'
}));

app.get('/auth/google/failure', (req, res) => {
    res.send("Something went wrong")
})

app.get('/auth/protected', isLoggeIn, (req, res) => {
    let { given_name, family_name, email, picture } = req.user;
    const user = {
        given_name: given_name,
        family_name: family_name,
        email: email,
        picture: picture,
    }
    res.cookie(
        'zUser',
        JSON.stringify(user),
        { maxAge: 3600000, httpOnly: false, secure: false }
    )
    console.log(user)
    res.redirect('http://localhost:5173'+'/');
})

app.use('/auth/logout', (req, res) => {
    req.session.destroy()
    res.clearCookie('zUser')
    res.redirect('http://localhost:5173'+'/');;
})
// FIM PASSPORT OAUTH GOOGLE

const productRouter = require('./routes/Product')
// const userRouter= require('./routes/User')

app.use('/', productRouter)
// app.use('/user', userRouter)
app.use('/uploads', express.static('uploads'))

app.listen(port, () => {
    console.log('server initialized')
    require('./db')
})
