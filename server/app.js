const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require('dotenv').config()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const kindergartensRouter = require('./routes/kindergarten');

const server = http.createServer(app);
const port = process.env.PORT || 8080;
app.set('port', port);

app.use(
    cors({
        credentials: true,
        origin: [
          "http://localhost:3000",
          `http://localhost:${port}`,
        ],
    })
);

//set msg size
app.use(express.json({ limit: "50mb", type: "application/json" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
    type: "application/x-www-form-urlencoded",
  })
);
//coockies
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Router
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/kindergartens", kindergartensRouter);

//connect DB
mongoose.connect('mongodb://localhost:27017/haganShelSaron', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

const io = new Server(server, {
    cors: {
        origin: `http://localhost:3000`,
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.join(1);

    socket.on("sendMessage",(data)=>{
        socket.to(1).emit("getMessage", data)
    })

    io.on('disconnect', () => {
        console.log(socket.id);
        socket.close();
    });
})

server.listen(port, ()=>{console.log(`Server listening on port ${port}`)});