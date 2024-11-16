import axios from 'axios';
import { Eye, Heart } from 'lucide-react';
import { useContext, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Modal,
  OverlayTrigger,
  ProgressBar,
  Tooltip
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import Rating from './Rating';





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
         <Card className="product-card">
           {/* Image Section with Overlays */}
           <div className="product-image-wrapper">
             <Link to={`/product/${product.slug}`}>
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
                   placement="left"
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
                   placement="left"
                   overlay={
                     <Tooltip>
                       {isWishlisted
                         ? 'Remove from Wishlist'
                         : 'Add to Wishlist'}
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
             </Link>
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
               onClick={() => addtoCartHandler(product)}
             >
               <i className="bi bi-cart-plus me-2"></i>
               {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
             </Button>
           </Card.Body>
         </Card>

         <Modal
           show={showQuickView}
           onHide={() => setShowQuickView(false)}
           centered
         >
           <Modal.Header closeButton>
             <Modal.Title>{product.name}</Modal.Title>
           </Modal.Header>
           <Modal.Body>
             <img
               src={product.image}
               alt={product.name}
               className="w-100 mb-3"
               style={{ maxHeight: '500px', objectFit: 'cover' }}
             />
             <h5>£{product.price}</h5>
             <p>Quick view content for {product.name}</p>
           </Modal.Body>
           <Modal.Footer>
             <Button
               variant="secondary"
               onClick={() => setShowQuickView(false)}
             >
               Close
             </Button>
             <Button variant="primary" disabled={product.countInStock === 0}>
               Add to Cart
             </Button>
           </Modal.Footer>
         </Modal>
       </>
     );
}

export default Product;