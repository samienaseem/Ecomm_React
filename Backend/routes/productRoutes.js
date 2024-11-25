import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js';

const productRouter=express.Router();

productRouter.get('/',async(req,res)=>{
    const products=await Product.find();
    res.send(products)
})

productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{
  const newProduct=new Product({
     name: 'sample-name' + Date.now(),
    slug: 'sample-slug' + Date.now(),
    image: '/images/p1.jpg',
    brand: 'sample-brand',
    category: 'sample-category',
    description: 'sample-description',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0
  })
  const product=await newProduct.save()
  res.send({message:"New product created succesfully", product});
}))

const PAGE_SIZE = 3

productRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const {query} = req;
    const pageSize= query.pageSize || PAGE_SIZE;
    const page=query.page || 1;
    const category= query.category || '';
    const rating = query.rating || '';
    const price = query.price || '';
    const order = query.order || '';
    const searchQuery= query.query || '';

    const queryFilter = searchQuery && searchQuery !== 'all' ? {
        name : {
            $regex: searchQuery,
            $options: 'i'
        }
    }: {}

    const categoryFilter= category && category!=='all' ? { category} : {}

    const priceFilter= price && price !== 'all' ? {
        price : {
            $gte:Number(price.split('-')[0]),
            $lte:Number(price.split('-')[1])
        }
    }:{}
    const ratingFilter = rating && rating !== 'all'? {
        rating:{
            $gte: Number(rating)
        }
    }:{}
    const sortOrder = 
    order === 'featured' ? {featured: -1}
    : order === 'lowest' ? {price : 1} 
    : order === 'highest' ? {price: -1}
    : order === 'toprated' ? {rating : -1}
    : order === 'newest' ? {createdAt: -1}
    : {_id: -1}
    
    const combinedFilter = {
        ...queryFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter,
    }

    const products = await Product.find(combinedFilter).sort(sortOrder).skip(pageSize * (page - 1)).limit(pageSize)

    const countProducts = await Product.countDocuments(combinedFilter);

    res.send({
        products,
        countProducts,
        page,
        pages: Math.ceil(countProducts/pageSize)
    });
  })
);

productRouter.get('/productlist',isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{
  const {query}= req;
  const page=query.page || 1;
  const pageSize = query.pageSize || PAGE_SIZE

  const productlist = await Product.find().skip(pageSize * (page-1)).limit(pageSize);
  //const productLength=productlist.length

  const countProducts=await Product.countDocuments();
  
  const pages= Math.ceil(countProducts/pageSize);
  res.send({
    productlist, 
    countProducts, 
    pages,
    page})
}))

productRouter.get("/categories", expressAsyncHandler(async(req,res)=>{
    const categories=await Product.find().distinct('category');
    res.send(categories);
}))

productRouter.get('/slug/:slug', async(req, res) => {
  console.log(req);
  console.log('printing from server');
  const product = await Product.findOne({slug:req.params.slug});
  if (product) {
    console.log(product);
    res.send(product);
  } else {
    console.log('Else in server has run ');
    res.status(404).send({ message: 'Product not found' });
  }
});

productRouter.get('/:id', async(req, res) => {
  console.log(req);
  console.log('printing from server for id call');
  const product = await Product.findById(req.params.id);
  if (product) {
    console.log(product);
    res.status(200).send(product);
  } else {
    console.log('Else in server has run ');
    res.status(404).send({ message: 'Product not found' });
  }
});

productRouter.put('/:id',isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{
  const productId=req.params.id;
  const product=await Product.findById(productId)
  if(product){
    product.name=req.body.name;
    product.slug=req.body.slug;
    product.image=req.body.image;
    product.brand=req.body.brand;
    product.category=req.body.category;
    product.countInStock=req.body.countInStock;
    product.description=req.body.description;

     const updateProduct = await product.save();
     res.send({message:"Product Updated"});
  
  }
  else{
    res.status(404).send({message:"Product not found"})
  }
 
}))

export default productRouter;