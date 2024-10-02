import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Rating from '../Components/Rating';

function Product(props){

    console.log(props)
    const {product}=props
    console.log("{Product}")
    console.log(product)
    
    return (
      <Card className="product">
        <Link to={`product/${product.slug}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        <Card.Body>
          <Link to={`product/${product.slug}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Rating rating={product.rating} reviews={product.numReviews}></Rating> 
          <Card.Text>£{product.price}</Card.Text>
          <Button>Add to Cart</Button>
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