import express from 'express';
import data from '../Data.js';
import Product from '../models/productModel';

const seedRouter=express.Router()

seedRouter.get('/',async(req,res)=>{
    await Product.remove({});
    const createdProducts=await Product.insertMany(data.Products)
    res.send({createdProducts})
})
export default seedRouter