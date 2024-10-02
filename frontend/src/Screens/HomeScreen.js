import axios from 'axios';
import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";

const reducer =(state,action)=>{
  switch(action.type){
    case 'FETCH_REQUESTS':
      return {...state,loading:true};
    case 'FETCH_SUCCESS':
      return{...state,loading:false,products: action.payload};
    case 'FETCH_FAIL':
      return{...state,loading:false, error: action.payload};
    default:
      return state;
  }
}

function HomeScreen(){
  const [{loading,error,products},dispatch]=useReducer(reducer,{
    products:[],
    loading:true,
    error: ''
  })
  // const[products, setProducts]=useState([]);
  useEffect(()=>{
    const fetchData=async()=>{
      dispatch({type: 'FETCH_REQUESTS' });
      try{
        const result = await axios.get('/api/product');
        console.log(result)
        console.log(result.status)
        dispatch({type:'FETCH_SUCCESS', payload:result.data});
        
      }catch(err){
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      //setProducts(result.data)
    }
    fetchData()
  },[])

    return (
      <div>
        <h1>Featured products</h1>
        <div className="products">
          { loading? (<h3>Loading...</h3>)
          : error ? (<h3>{error}</h3> )
          : ( products.map((product) => (
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
            </div> )
          ))}
        </div>
      </div>
    );
}
export default HomeScreen