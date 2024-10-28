import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import Button from 'react-bootstrap/esm/Button'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import LoadingBox from '../Components/LoadingBox'
import MessageBox from '../Components/MessageBox'
import { Store } from '../Store'

const reducer=(state,action)=>{
    switch(action.type){
        case 'FETCH_REQUEST':{
            return {...state,loading:true}
        }
        case "FETCH_SUCCESS":{
            return {...state, loading:false, orders: action.payload}
        }
        case "FETCH_FAIL":{
            return {...state, loading:false, error: action.payload}
        }
        default:{
            return state;
        }
    }
}

export default function OrderHistoryScreen() {
    const navigate= useNavigate();
    const {state,dispatch: ctxDispatch}=useContext(Store);
    const {userInfo}=state;
    const [{loading, error, orders},dispatch]=useReducer(reducer,{
        loading: true,
        error:'',
        orders:[]
    })

    useEffect(()=>{
        const fetchdata= async()=>{
            dispatch({type: "FETCH_REQUEST"});
            try{
                const { data } = await axios.get('/api/orders/mine', {
                  headers: {
                    authorization: `Bearer ${userInfo.token}`,
                  },
                });
                dispatch({type: "FETCH_SUCCESS", payload: data})
            }catch(err){
                dispatch({type: "FETCH_FAIL" , payload: err.message})
            }
            
        }
        fetchdata();
    },[userInfo])


  return (
    <div className='container'>
      <Helmet>Order History</Helmet>

      <h1 className='my-3'>Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {
                orders.map((order)=>(
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt}</td>
                      <td>{order.totalPrice}</td>
                      <td>{order.isPaid ? order.paidAt : 'No'}</td>
                      <td>{order.isDelivered ? order.deliveredAt : 'No'}</td>
                      <td>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => navigate(`/order/${order._id}`)}
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                ))
            }
          </tbody>
        </table>
      )}
    </div>
  );
}
