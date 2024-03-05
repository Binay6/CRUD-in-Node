const express = require("express") ;
const mongoose = require("mongoose") ;
const bodyParser = require("body-parser") ;
const app = express() ;

app.use(bodyParser.urlencoded({extended:true})) ;
app.use(express.json()) ;

mongoose.connect('mongodb+srv://binay3662:8rSsKVVCooxJWxN7@cluster0.dlhk7wc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));


const productSchema = new mongoose.Schema({
    name:String,
    desc:String,
    price:Number,
})

const Product = new mongoose.model("Product",productSchema)
//create
app.post("/api/v1/product/new",async (req,res)=>{
    const product = await Product.create(req.body) ;

    res.status(200).json({
        success:true,
        product
    })
})

app.get("/",(req,res)=>{
    res.send("<h1>Hello World!</h1>") ;
    //res.send(new Buffer('wahoo')) ;
}) ;
//read
app.get("/",(req,res)=>{
    res.send("<h1>Hello World!</h1>") ;
    //res.send(new Buffer('wahoo')) ;
}) ;

app.listen(3000,()=>{
    console.log("Server is working on http://localhost:3000")

})