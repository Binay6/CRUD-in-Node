const express = require("express") ;
const mongoose = require("mongoose") ;
const bodyParser = require("body-parser") ;
const app = express() ;

app.use(bodyParser.urlencoded({extended:true})) ;
app.use(express.json()) ;

mongoose.connect('url',{
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
    
}) ;

//read
app.get("/api/v1/products",async (req,res)=>{
    const products = await Product.find() ;

    res.status(200).json({succes:true,products})
}) ;

//update
app.put("/api/v1/product/:id",async (req,res)=>{
    //const product = await Product.findById(req.params.id) ;
    // need to change to let cause I am changing it later so cant be constant var

    let product = await Product.findById(req.params.id) ;
    if(!product){
        return res.status(500).json({
            success:false,
            message:"The product not found" 
        })
    }

    product =await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        useFindAndModify:true,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        product
    }) 

})

//Delete
app.delete("/api/v1/product/:id",async (req,res)=>{
    const product = await Product.findById(req.params.id) 

    if(!product){
        return res.status(500).json({
            success:false,
            message:"The product not found" 
        })
    }
    await product.deleteOne()

    res.status(500).json({
        success:true,
        message:"Product deleted successfully"
    })
})



app.listen(3000,()=>{
    console.log("Server is working on http://localhost:3000")

})