import axios from 'axios';
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Rating from '../Components/Rating';
import { Store } from '../Store';

function Product(props){
  const {state,dispatch:ctxDispatch}=useContext(Store)
  const {cart:{cartItems}}=state

    console.log(props)
    const {product}=props
    console.log("{Product}")
    console.log(product)

    const addtoCartHandler = async(item)=>{
      const existItem=cartItems.find((x)=>x._id===item._id);
      const quantity = existItem ? existItem.quantity + 1 : 1;
      console.log({ "ProductComponent": existItem,"quantity":{...item,quantity} });

      const {data}=await axios.get(`/api/product/${item._id}`);
      if(data.countInStock < quantity){
        window.alert("Sorry, Requested Quantity is not available");
        return
      }

      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: {...item,quantity:quantity}
      })
    }
    
    return (
      <Card className="product">
        <Link to={`/product/${product.slug}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        <Card.Body>
          <Link to={`/product/${product.slug}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Rating rating={product.rating} reviews={product.numReviews}></Rating> 
          <Card.Text>£{product.price}</Card.Text>
          {
            product.countInStock ===0 ? (
              <Button variant='light' disabled> Out of Stock</Button>
            ):(
          <Button onClick={()=>addtoCartHandler(product)}>Add to Cart</Button>
            )
            }
        </Card.Body>
        {/* <div className="product_info">
          <p>
            <strong>£{product.price}</strong>
          </p>
          <button>Add to Cart</button>
        </div> */}
      </Card>
    );
}
export default Product;