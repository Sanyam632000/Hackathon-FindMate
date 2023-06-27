const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path")
var cors = require('cors')
const multer = require('multer')
const userRouter = require('./Route/user.js')
const authRouter = require('./Route/auth.js')
const questionRouter = require('./Route/question.js')
const marketRouter = require('./Route/market.js')
const conversationRouter = require('./Route/conversation.js')
const messageRouter = require("./Route/message.js")

dotenv.config()

const connectDB =async()=>{
    try{
        const con = await mongoose.connect(process.env.MONGO_URL,{useNewUrlParser : true,useUnifiedTopology: true})
        console.log("Connected")
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

connectDB();

app.use("/images",express.static(path.join(__dirname,"public/image")));

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,"public/image")
    },
    filename: (req,file,cb) =>{
        cb(null,file.originalname)
    }
})

const upload = multer({storage});
app.post("/post/upload", upload.single("file"), (req,res) =>{
    try{
        return res.status(200).json("File upload successfully... ")
    }catch(err){
        console.log(err)
    }
})


//middleware
app.use(cors())
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/",userRouter);
app.use("/",authRouter);
app.use("/question",questionRouter);
app.use("/market",marketRouter);
app.use("/conversation",conversationRouter);
app.use("/message",messageRouter)


app.use(express.static(path.join(__dirname, "/hackathon")));

/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/hackathon/build', 'index.html'));
});*/

app.listen(7070,(req,res) => {
    console.log(`This is backend`)
})