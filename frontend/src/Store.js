import { createContext, useReducer } from "react";

export const Store=createContext();

function reducer(state,action){
    switch (action.type) {
      case 'CART_ADD_ITEM':
        const newItem=action.payload;
        const existItem=state.cart.cartItems.find((x)=> x._id===newItem._id)
        const cartItems = existItem 
        ? state.cart.cartItems.map((item)=>
            item._id===existItem._id ? newItem : item
        )
        : [...state.cart.cartItems,newItem]
        return{
            ...state,
            cart:{
                ...state.cart,
                cartItems
            }
        }  
        // return {
        //   ...state, // Keep the rest of the state unchanged
        //   cart: {
        //     ...state.cart, // Keep other cart properties (if any) unchanged
        //     cartItems: [...state.cart.cartItems, action.payload], // Add new item to cartItems
        //   },
        // };

      default:
        return state;
    }
}
const initialState={
    cart : {
        cartItems:[]
    }
}

export const StoreProvider=({children})=>{
    // const [count,setCount]=useState(0)
    const[state,dispatch]=useReducer(reducer,initialState)

    return(

        <Store.Provider value={{state, dispatch }}>
            {children}
        </Store.Provider>

    );
}
