require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const http = require('http');


const PORT = process.env.PORT || 3000
// const MONGO_URI = process.env.MONGO_URI
const MONGO_URI = process.env.MONGO_URI_DEV
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN

const authRoutes = require('./routes/auth')
const workoutRoutes = require('./routes/workouts')
const clientRoutes = require('./routes/client')

// express app
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origins: [ALLOWED_ORIGIN]
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('my message', (msg) => {
        io.emit('my broadcast', `server: ${msg}`);
    });

    socket.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            io.emit('timer', new Date());
        }, interval);
    });
    
});

// connect do db
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => {
        // listen for requests
        app.listen(PORT, () => {
            console.log(`connected to db & app running in port ${PORT}`)
        })
        // server.listen(PORT, () => {
        //     console.log(`connected to db & app running in port ${PORT}`)
        // });
    })
    .catch((error) => {
        console.log(error)
    })

// middlewares
app.use(
    cors({
        origin: [ALLOWED_ORIGIN],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// app routes
app.use("/api/auth", authRoutes);
app.use('/api/workouts', workoutRoutes)
app.use('/api/client', clientRoutes)
// app.use('/api/user', userRoutes)
