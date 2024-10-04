import express from 'express';
import data from './Data.js';

const app=express();

app.get('/api/product',(req,res)=>{
    res.send(data.Products)
})

app.get('/api/product/slug/:slug',(req,res)=>{
    console.log(req);
    console.log("printing from server")
    const product=data.Products.find((x)=>x.slug===req.params.slug)
    if(product){
        res.status(200).send(product)
    }
    else{
        res.status(400).send({message: "Product not found"});
    }
})


const port=process.env.PORT || 4000

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`)
}) 
// http://localhost:4000/api/product