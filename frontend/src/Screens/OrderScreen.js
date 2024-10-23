import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store';



const reducer=(state,action)=>{
    switch(action.type){
        case "FETCH_REQUEST":{
            return {
                ...state,
                loading:true,
                error:""
            }
        }
        case "FETCH_SUCCESS":{
            return{
                ...state,
                loading:false,
                order:action.payload,
                error:""
            }
        }
        case "FETCH_FAIL":{
            return {
                ...state,
                loading:false,
                error: action.payload
            }
        }
        default:{
            return state;
        }
    }
}

export default function OrderScreen() {
    const navigate=useNavigate();
    const {id}=useParams();

    const {state,dispatch:ctxDispatch}=useContext(Store);

    const {userInfo}=state;
    //const {xys}=params

    const [{loading,error,order},dispatch]=useReducer(reducer,{
        loading:true,
        error:"",
        order:{},
    })

    console.log(id)

    useEffect(()=>{
        if(!userInfo){
            navigate('/signin')
        }
    },[navigate,userInfo])
  return (
    <div>
      <Helmet>
        <title>Order Preview</title>
      </Helmet>
      <div className='container'>

      </div>
    </div>
  )
}
