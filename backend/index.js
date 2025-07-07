const port = 4000;

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { type } = require('os');
const { error } = require('console');
const { console } = require('inspector');

// Enable JSON & CORS
app.use(express.json());
app.use(cors());

// 📂 Ensure upload folder exists
const uploadDir = './upload/images';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 🌐 Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://rr200269:vishnu123@cluster0.d6235hx.mongodb.net/e-commerce?retryWrites=true&w=majority")
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// 👋 Test route
app.get("/", (req, res) => {
    res.send("Express app is running");
});

// 🗃️ Multer setup for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });

// 🔗 Serve images statically
app.use('/images', express.static(uploadDir));

// 📤 Image upload endpoint
app.post('/upload', upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    // ✅ Success response
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

//schema for creating the products
const Product=mongoose.model("product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
})

app.post('/addproduct',async(req,res)=>{
    let products=await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0];
        id=last_product.id+1;
    }
    else{
        id=1;
    }
    const product=new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//creating api for deleting projects
app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({
        id:req.body.id
    });
    console.log("removed");
    res.json({
        success:true,
        name:req.body.name
    });
})

//create api for getting all products
app.get('/allproducts',async (req,res)=>{
    let products=await Product.find({});
    console.log('all products fetched');
    res.send(products);
})

//schema creating for user model
const Users=mongoose.model('Users',{
    name:{
        type:String,

    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    data:{
        type:Date,
        default:Date.now,
    }

})

//crating end point for registration the user
app.post('/signup',async(req,res)=>{
    let check=await Users.findOne({email:req.body.email});
    if(check){
        res.status(400).json({
            success:false,
            error:"existing user found with the same email address"
        })
    }
    let cart={};
    for (let i = 0; i < 300; i++) {
        cart[i]=0;
    }
    const user=new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await user.save();

    const data={
        user:{
            id:user.id
        }
    }

    const token=jwt.sign(data,'secret_ecom');
    res.json({
        success:true,
        token
    })
})

//creating end point for user login

app.post('/login',async(req,res)=>{
    let user=await Users.findOne({email:req.body.email});
    if(user){
        const passCompare=req.body.password==user.password;
        if(passCompare){
            const data={
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data,'secret_ecom');
            res.json({
                success:true,
                token
            })
        }
        else{
            res.json({
                success:false,
                error:"wrong password"
            })
        }

    }
    else{
        res.json({
            success:false,
            error:"user not found"
        })
    }
})

//crating end point for new collection data

app.get('/newcollection',async(req,res)=>{
    let products=await Product.find({});
    let newcollection=products.slice(1).slice(-8);
    console.log('New Collections Fetched');
    res.send(newcollection);
})
app.get('/popularinwomen',async(req,res)=>{
    let products=await Product.find({category:"women"});
    let popular_in_women=products.slice(0,4);
    console.log('popular in women fetched');
    res.send(popular_in_women);
})

//creating middle ware to fetch user
const fetchuser=async(req,res,next)=>{
    const token=req.header('auth-toke');
    if(!token){
        res.status(401).send({
            error:"please authenticate with valid email"
        })
    }
    else{
        try{
            const data=jwt.verify(token,'secret_ecom');
            req.user=data.user;
            next();
        }
        catch(error){
            res.status(401).send({
                error:"please authenticate with a valid token"
            })
        }
    }
}
//cart api
app.post('/addtocart',fetchuser,async(req,res)=>{
    // console.log(req.body,req.user);
    let userData=await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send('Added');

})

//end point to remove a product form cart
app.post('/removefromcart',fetchuser,async(req,res)=>{
    let userData=await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]){
    userData.cartData[req.body.itemId]-=1;
    }
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send('removed');
})

app.post('/getcart',fetchuser,async(req,res)=>{
    console.log('get cart');
    let userDate = await Users.findOne({_id:req.user.id});
    res.json(userDate.cartData);
})
// app.post('/')
// ▶️ Start server
app.listen(port, (err) => {
    if (!err) {
        console.log(`🚀 Server running on http://localhost:${port}`);
    } else {
        console.error("❌ Server error:", err);
    }
});
