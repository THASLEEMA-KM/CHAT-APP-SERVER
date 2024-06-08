const express = require('express')
const http = require('http')
const socketIo = require("socket.io")
const cors = require('cors');
const helmet = require('helmet');

const app = express()
const server = http.createServer(app)

const io = socketIo(server , {
    cors:{
        origin:"https://chat-app-beryl-sigma.vercel.app",
        methods:['GET','POST']
    }
})

app.get("/",(req,res)=>{
    res.send("working!!!")
  })


app.use(cors());
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          connectSrc: ["'self'", "https://chat-app-beryl-sigma.vercel.app"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          fontSrc: ["'self'", "data:"]
        },
      },
}))

io.on("connection" , (socket)=>
{
    console.log('User connected');

    socket.on("chat message" , (msg)=>
        {
            io.emit('chat message' , msg);
        }
    );

    socket.on('disconnect' , ()=>
    {
        console.log('User disconnected');
    })

});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port  http://localhost:${PORT}`);
}
);