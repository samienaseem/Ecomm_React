import axios from 'axios';
import { Eye, Heart } from 'lucide-react';
import { useContext, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  OverlayTrigger,
  ProgressBar,
  Tooltip
} from 'react-bootstrap';
import { Store } from '../Store';
import Rating from './Rating';


const styles = `
.product-card {
  transition: all 0.3s ease;
  height: 100%;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.product-image-wrapper {
  position: relative;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  overflow: hidden;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.1);
}

.overlay-buttons {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .overlay-buttons {
  opacity: 1;
}

.badge-corner {
  position: absolute;
  z-index: 2;
}

.badge-corner.top-left {
  top: 10px;
  left: 10px;
}

.badge-corner.top-right {
  top: 10px;
  right: 10px;
}

.price-old {
  text-decoration: line-through;
  color: #6c757d;
  font-size: 0.9em;
}

.product-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.4em;
}

.wishlist-btn.active {
  color: #dc3545;
  border-color: #dc3545;
}

.stock-warning {
  font-size: 0.8em;
  color: #fd7e14;
}

/* Responsive font sizes */
@media (max-width: 768px) {
  .product-title {
    font-size: 0.9rem;
  }
  
  .price {
    font-size: 1.1rem;
  }
}

.btn-quick-action {
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: white;
  border: none;
  transition: all 0.2s ease;
}

.btn-quick-action:hover {
  background: #f8f9fa;
  transform: scale(1.1);
}
`;



function Product(props){
  const {state,dispatch:ctxDispatch}=useContext(Store)
  const {cart:{cartItems}}=state

  // const [isHovered, setIsHovered] = useState(false);
  // const [isWishlist, setIsWishlist] = useState(false);

   const [isWishlisted, setIsWishlisted] = useState(false);
   const [showQuickView, setShowQuickView] = useState(false);

    console.log(props)
    const {product}=props
    console.log("{Product}")
    console.log(product)

    const isOnSale=true

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
    const renderStars = (rating) => {
      return [...Array(5)].map((_, index) => (
        <i
          key={index}
          className={`bi ${index < rating ? 'bi-star-fill' : 'bi-star'}`}
          style={{ color: index < rating ? '#ffc107' : '#dee2e6' }}
        />
      ));
    };

     return (
       <>
         <style>{styles}</style>
         <Card className="product-card">
           {/* Image Section with Overlays */}
           <div className="product-image-wrapper">
             {/* Status Badges */}
             {product.countInStock === 0 && (
               <Badge bg="danger" className="badge-corner top-left">
                 Out of Stock
               </Badge>
             )}
             {isOnSale && (
               <Badge bg="success" className="badge-corner top-right">
                 Sale
               </Badge>
             )}

             <Card.Img
               className="product-image"
               src={product.image}
               alt={product.name}
             />

             {/* Overlay Actions */}
             <div className="overlay-buttons">
               <OverlayTrigger
                 placement="top"
                 overlay={<Tooltip>Quick View</Tooltip>}
               >
                 <Button
                   variant="light"
                   className="btn-quick-action"
                   onClick={() => setShowQuickView(true)}
                 >
                   <i className="bi bi-eye"></i>
                   <Eye size={16} />
                 </Button>
               </OverlayTrigger>

               <OverlayTrigger
                 placement="top"
                 overlay={
                   <Tooltip>
                     {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                   </Tooltip>
                 }
               >
                 <Button
                   variant="light"
                   className={`btn-quick-action ${
                     isWishlisted ? 'active' : ''
                   }`}
                   onClick={() => setIsWishlisted(!isWishlisted)}
                 >
                   <i
                     className={`bi ${
                       isWishlisted ? 'bi-heart-fill' : 'bi-heart'
                     }`}
                   ></i>
                   <Heart
                     size={16}
                     fill={isWishlisted ? 'currentColor' : 'none'}
                   />
                 </Button>
               </OverlayTrigger>
             </div>
           </div>

           <Card.Body>
             {/* Product Info */}
             <Card.Title className="product-title">{product.name}</Card.Title>

             {/* Rating */}
             <div className="mb-2">
               <div className="d-flex align-items-center">
                 {/* {renderStars(product.rating)} */}
                 <Rating rating={product.rating}></Rating>
                 <span className="ms-2 text-muted">({product.numReviews})</span>
               </div>
             </div>

             {/* Price */}
             <div className="mb-3">
               {product.price && (
                 <span className="price-old me-2">£{product.price}</span>
               )}
               <span className="price fw-bold">£{product.price}</span>
             </div>

             {/* Stock Status */}
             {product.countInStock > 0 && product.countInStock < 10 && (
               <div className="mb-2">
                 <ProgressBar
                   now={(product.countInStock / 10) * 100}
                   variant="warning"
                   className="mb-1"
                 />
                 <small className="stock-warning">
                   Only {product.countInStock} left in stock
                 </small>
               </div>
             )}

             {/* Add to Cart Button */}
             <Button
               variant={product.countInStock === 0 ? 'secondary' : 'primary'}
               className="w-100"
               disabled={product.countInStock === 0}
             >
               <i className="bi bi-cart-plus me-2"></i>
               {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
             </Button>
           </Card.Body>
         </Card>
       </>
     );
}

export default Product;