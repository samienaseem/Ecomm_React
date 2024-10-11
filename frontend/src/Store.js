import { createContext, useReducer } from "react";

export const Store=createContext();

function reducer(state,action){
    switch(action.type){
        case 'CART_ADD_ITEM':

        default:
            return state

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
