import { Link } from "react-router-dom";
import data from "../Data";

function HomeScreen(){
    return (
      <div>
        <h1>Featured products</h1>
        <div className="products">
          {data.Products.map((product) => (
            <div key={product.slug} className="product">
              <Link to={`product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="product_info">
                <Link to={`product/${product.slug}`}>
                  <p>{product.name}</p>
                </Link>
                <p>
                  <strong>£{product.price}</strong>
                </p>
                <button>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
export default HomeScreen