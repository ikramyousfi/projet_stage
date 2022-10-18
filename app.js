require('dotenv').config()
const mongoose = require('mongoose');
const connectDB=require('./db/connect.js')
const port = process.env.PORT || 3000;
const express=require('express');
const User=require('./models/user');
const app= express()
const server= require('http').createServer(app)
const http = require('http').createServer(app);

const io = require('socket.io')(http, { cors: { origin: "*" } });




//middleware
const auth = require('./middleware/auth')

app.use(express.json()) 



//routes declaration
const Authroutes = require('./routes/userRoutes')
const Adminroutes = require('./routes/adminRoutes')
const ProfileRoutes = require('./routes/profileRoutes')
const ChatRoutes=require('./routes/chatRoutes')
const MessageRoutes=require('./routes/messageRoutes')
const PhotoDeProfileRoutes = require('./routes/photoDeProfileRoutes')


 var getUser= async()=>{
  
    const users= await User.find()
    
    return  users

 }
 getUser().then(data=>{
    io.emit('here', data)
 })

 io.on('connection', (socket)=>{
    console.log('un user est connected', socket.id);
    // io.emit('here', here)
    // io.emit('here', getUser())
    
    // socket.on("sbah", (name, adr)=>{
    //     console.log(name);
    //     console.log(adr);

    // } )

    socket.on('disconnect',()=>{
    console.log('user is diconnected with id', socket.id );
    })

})

// app.use(cors({
//     origin: '192.168.1.4:1000'
//   }));
// app.get('/walid', async (req, res) => {
//     const users= await User.find()
//     console.log(users);
   


//     res.send('hiiiiiiiiiiii')
// })




//routes using
app.use('/api/auth', Authroutes)
app.use('/api/auth', Adminroutes)
app.use('/api/profile', auth, ProfileRoutes)
app.use('/api/chat',  ChatRoutes)
app.use('/api/message', auth, MessageRoutes)
app.use('/api/photoDeProfile', auth, PhotoDeProfileRoutes)






const start = async () => {
    try {
        http.listen(port, ()=> console.log(`server is listening on port ${port} ...`));
        await connectDB(process.env.MONGO_URI);
        console.log('connected to db');
       
    } catch (error) {
        console.log(error);

    }
}
start()



