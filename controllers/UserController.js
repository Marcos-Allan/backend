// const jwt = require('jsonwebtoken')
// require('dotenv').config()
// const bcrypt = require('bcrypt')

// const User = require('../models/User')

// exports.create = async (req, res) => {
    
//     const { name, email, image, password, confirmpassword } = req.body

//     if(!name){
//         return res.status(422).send({ message: 'Impossivel prosseguir sem um nome' })
//     }
    
//     if(!email){
//         return res.status(422).send({ message: 'Impossivel prosseguir sem um email' })
//     }
    
//     if(!image){
//         return res.status(422).send({ message: 'Impossivel prosseguir sem uma imagem de usuario' })
//     }
    
//     if(!password){
//         return res.status(422).send({ message: 'Impossivel prosseguir sem uma senha' })
//     }

//     if(password !== confirmpassword){
//         return res.status(422).json({ message: 'As senhas não são idênticas' })
//     }
    
//     // CHECAR SE O USUARIO JÁ FOI CADASTRADO
//     const userExists = await User.findOne({ email: email })
    
//     if(userExists){
//         return res.status(422).json({ message: 'Email do Usuario ja cadastrado, por favor logue com a conta existente ou crie uma nova' })
//     }

//     // CRIAR PASSWORD
//     const salt = await bcrypt.genSalt(12)

//     const passwordHash = await bcrypt.hash(password, salt)

//     //CRIAR USUARIO
//     const user = new User({
//         name,
//         email,
//         image,
//         password: passwordHash,
//     })

//     try {

//         await user.save()
//         res.status(201).json({ message: 'Usuario criado com sucesso' })
        
//     } catch (error) {
//         res.status(500).json({ message: 'Erro no servidor' })
//     }

// }

// exports.login = async (req, res) => {
    
//     const { email, password } = req.body

//     if(!email){
//         return res.status(422).send({ message: 'Impossivel prosseguir sem um email' })
//     }
    
//     if(!password){
//         return res.status(422).send({ message: 'Impossivel prosseguir sem uma senha' })
//     }   

//     // CHECAR SE O USUARIO JÁ FOI CADASTRADO
//     const user = await User.findOne({ email: email })
    
//     if(!user){
//         return res.status(404).json({ message: 'Usuario não encontrado' })
//     }

//     //CHECAR SE O USUARIO DIGITOU A SENHA CORRETA
//     const checkPassword = await bcrypt.compare(password, user.password)

//     if(!checkPassword){
//         return res.status(422).json({ message: "Senha inválida" })
//     }

//     try {

//         const secret = proocess.env.secret

//         const token = jwt.sign(
//             {
//                 id: user.id,
//             },
//             secret,
//         )

//         res.status(200).json({ message: 'Autenticação realizada com êxito', token })
        
//     } catch (error) {
//         return res.status(500).json({ message: 'Ocorreu um erro no servidor, tente novamente mais tarde' })
//     }

// }

// //FUNÇÃO MIDLEWARE CHECA SE O USUARIO TEM O TOKEN VÁLIDO
// exports.checkToken = (req, res, next) => {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ') [1]

//     if(!token){
//         return res.status(401).json({ message: 'Acesso negado você não tem um token' })
//     }
// }

// // ROTA PRIVADA
// exports.profile = async (req, res) => {

//     const id = req.params.id

//     const user = await User.findById(id, '-password')

//     if(!user){
//         return res.status(404).json({ message: 'Usuario não encontrado' })
//     }

//     try {

//         const secret = process.env.secret
//         jwt.verify(token, secret)
//         next()
        
//     } catch (error) {
//         return res.status(400).json({ message: 'token invalido' })
//     }

//     res.status(200).json({ user })

// }