import bcrypt from 'bcryptjs';
const data = {
  Users: [
    {
      name: 'Samie',
      email: 'admin@atelier.com',
      password: bcrypt.hashSync('samar@1213134'),
      isAdmin: true,
    },
    {
      name: 'Saquib',
      email: 'user@atelier.com',
      password: bcrypt.hashSync('samar@1213134'),
      isAdmin: false,
    },
  ],
  Products: [
    {
      //_id: '1',
      name: 'Nike Slim Shirt',
      slug: 'nike-slim-shirt',
      category: 'Shirts',
      image: '/images/p1.jpg',
      price: 120,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality shirts',
    },
    {
      // _id: '2',
      name: 'Adidas Fit Shirt',
      slug: 'adidas-fit-shirt',
      category: 'Shirts',
      image: '/images/p2.jpg',
      price: 250,
      countInStock: 20,
      brand: 'Adidas',
      rating: 4.0,
      numReviews: 10,
      description: 'high quality shirts',
    },
    {
      //_id: '3',
      name: 'Nike Slim Pant',
      slug: 'nike-slim-pant',
      category: 'Pants',
      image: '/images/p3.jpg',
      price: 25,
      countInStock: 15,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 14,
      description: 'high quality product',
    },
    {
      //_id: '4',
      name: 'Adidas Fit Pant',
      slug: 'adidas-fit-pant',
      category: 'Pants',
      image: '/images/p4.jpg',
      price: 65,
      countInStock: 5,
      brand: 'Adidas',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality products',
    },
    {
      // _id: '5',
      name: 'Adidas Fit Pant 1',
      slug: 'adidas-fit-pant 1',
      category: 'Pants',
      image: '/images/p4.jpg',
      price: 65,
      countInStock: 0,
      brand: 'Adidas',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality products',
    },
    {
      //_id: '6',
      name: 'Popcorn Tshirt',
      slug: '11ST_CLR_POPBLUE',
      category: 'Tshirts',
      image: '/images/p5.png',
      price: 54,
      countInStock: 10,
      brand: '11th Street Atelier',
      rating: 4.3,
      numReviews: 100,
      description: 'high quality products',
    },
    {
      //_id: '7',
      name: 'Pink Popcorn Tshirt',
      slug: '11ST_CLR_POPPINK',
      category: 'Tshirts',
      image: '/images/p6.png',
      price: 54,
      countInStock: 10,
      brand: '11th Street Atelier',
      rating: 4.3,
      numReviews: 100,
      description: 'high quality products',
    },
    {
      //_id: '8',
      name: 'Sky Popcorn Tshirt',
      slug: '11ST_CLR_POPSKY',
      category: 'Tshirts',
      image: '/images/p7.png',
      price: 54,
      countInStock: 4,
      brand: '11th Street Atelier',
      rating: 4.3,
      numReviews: 100,
      description: 'high quality products',
    },
  ],
};
export default data;
