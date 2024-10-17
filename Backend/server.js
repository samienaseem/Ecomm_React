import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import data from './Data.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(()=>{
  console.log("Connected to MongoDB")
}).catch(err=>{
  console.log(err.message)
})



const app=express();

app.get('/api/product',(req,res)=>{
    res.send(data.Products)
})

app.get('/api/product/slug/:slug',(req,res)=>{
    console.log(req);
    console.log("printing from server")
    const product=data.Products.find((x)=>x.slug===req.params.slug)
    if(product){
        console.log(product)
        res.status(200).send(product)
    }
    else{
        console.log("Else in server has run ")
        res.status(404).send({message: "Product not found"});
    }
})

app.get('/api/product/:id', (req, res) => {
  console.log(req);
  console.log('printing from server for id call');
  const product = data.Products.find((x) => x._id === req.params.id);
  if (product) {
    console.log(product);
    res.status(200).send(product);
  } else {
    console.log('Else in server has run ');
    res.status(404).send({ message: 'Product not found' });
  }
});


const port=process.env.PORT || 4000

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`)
}) 
// http://localhost:4000/api/product