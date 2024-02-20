import express from 'express';
import data from './Data.js';

const app=express();

app.get('/api/product',(req,res)=>{
    res.send(data.Products)
})

const port=process.env.PORT || 4000

app.listen(port,()=>{
    console.log(`Server is running at http:/localhost:${port}`)
}) 