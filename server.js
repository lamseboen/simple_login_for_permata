const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const {
    loginSchema,
    registerSchema
} = require('./validation.js')
const app = express()
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())


let dataUser = [{
    id: 1,
    email: 'admin@gmail.com',
    password: '12345',
    nama: "admin"
}]



app.post('/register', async (req, res) => {
    const {
        nama,
        email,
        password
    } = req.body

    try {
        const validate = await registerSchema.validateAsync({
            nama,
            email,
            password
        })
        const isEmailCanRegister = (dataUser.find(el => el.email === email) === undefined)

        if (!isEmailCanRegister) throw 'email sudah teregistrasi'

        let lastId = Math.max(...dataUser.map(el => el.id))
        dataUser.push({
            id: lastId + 1,
            email,
            password,
            nama
        })

        res.send({
            status: 'success',
            message: ''
        })
    } catch (error) {
        res.send({
            status: 'error',
            message: error
        })
    }
})


app.post('/login', async (req, res) => {
    const {
        email,
        password
    } = req.body

    try {
        const validate = await loginSchema.validateAsync({
            email,
            password
        })
        const isLoginDataCorrect = (dataUser.find(el => el.email === email && el.password === password) !== undefined)

        if (!isLoginDataCorrect) throw 'email tidak terdaftar atau password salah'

        let token = jwt.sign({
            email,
            password
        }, 'shhhhh');

        res.send({
            status: 'success',
            message: '',
            token
        })
    } catch (error) {
        res.send({
            status: 'error',
            message: error
        })
    }
})



app.listen(3000, () => {
    console.log("running on 3000")
})