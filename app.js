const express = require('express')
const mongoose = require('mongoose')
const app = express()
const auth = require('./routes/auth')
const booksRoute = require('./routes/books')
const chat = require('./routes/chat')
const http = require('http')
const socketIO = require('socket.io')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const {SECRET, DB_URL, PORT} = require('./config')
const MongoStore = require('connect-mongo')
const server = http.Server(app)
const io = socketIO(server)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    store: MongoStore.create({mongoUrl: DB_URL})
}))
  
app.use('/public', express.static(__dirname+'/public'))
app.use('/', auth)
app.use('/', booksRoute)
app.use('/', chat)
app.use((req, res) => {
    res.render('errors/404', {
        title: '404 | PAGE NOT FOUND'
    })
  })

io.on('connection', (socket) => {
    const {id} = socket

    socket.on('message-to-me', (msg) => {
        msg.type = 'me'
        socket.emit('message-to-me', msg)
    })

    socket.on('message-to-all', (msg) => {
        msg.type = `User-${id}`
        socket.broadcast.emit('message-to-all', msg)
        socket.emit('message-to-all', msg)
    })

    socket.on('disconnect', () => {
    })
})

const start = async () => {
    try {
        await mongoose.connect(DB_URL)
        server.listen(PORT, () => console.log(`Server listening post ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()