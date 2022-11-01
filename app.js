const  express=require("express")
const body_parser=require("body-parser")
const { default: mongoose, mongo } = require("mongoose")
const { appendFile } = require("fs")
const md5=require("md5")
mongoose.connect("mongodb://localhost:27017/userdb")

const app=express()
app.use(body_parser.urlencoded({extended:true}))
const user_schmea=mongoose.Schema({
    name:String,
    password:String
})
const chair=mongoose.model('chair',user_schmea)
app.listen(3000,()=>{
    console.log("server is running sucessfully");
})
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
app.route("/login").get((req,res)=>{
    res.sendFile(__dirname+"/login.html")
})
.post((req,res)=>{
const name=req.body.name
const password=md5(req.body.password)
chair.findOne({name:name},(err,sol)=>{
if(err){
    console.log(err);
}
else{
    if(sol.password==password){
        res.sendFile(__dirname+"/page.html")
    }
    else{
        res.send("error occured")
    }
}
})
})


app.route("/register").get((req,res)=>{
    res.sendFile(__dirname+"/register.html")
})
.post((req,res)=>{
    const name=req.body.name
    const password=md5(req.body.password)
    const newuser=new chair({
        name:name,password:password
    })
    newuser.save((err)=>{
        if(err){
            console.log(err);
        }
        else{
    res.sendFile(__dirname+"/page.html")
        }
    })
})
