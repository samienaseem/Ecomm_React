import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Chart from 'react-google-charts';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import ChartComponent from '../Components/ChartComponent';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST': {
      return { ...state, loading: true };
    }
    case 'FETCH_SUCCESS': {
      return { ...state, loading: false, summary: action.payload };
    }
    case 'FETCH_FAIL': {
      return { ...state, loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default function DashboardScreen() {

   const { state, dispatch:ctxDispatch } = useContext(Store);
   const { userInfo } = state; 

  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    summary: [],
  });

  

  console.log({"UserinfoDashboard":userInfo})

  useEffect(() => {
    console.log('sending request');
    dispatch({ type: 'FETCH_REQUEST' });
    const fetchData = async () => {
      try {
        
        const { data } = await axios.get('/api/orders/summary', {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        });
        console.log({ "DashboardScreen": data });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        
        const message =
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message;
        dispatch({ type: 'FETCH_FAIL', payload: message });
        toast.error(message);
        
      }
    };
    fetchData();
  }, [userInfo]);
  console.log({ DashboardScreenSummary: summary });

  return (
    <div className="container">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h1>Dashboard</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {summary.users && summary.users[0]
                      ? summary.users[0].numUsers
                      : 0}
                  </Card.Title>
                  <Card.Text>Users</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {summary.orders && summary.orders[0]
                      ? summary.orders[0].numOrders
                      : 0}
                  </Card.Title>
                  <Card.Text>Orders</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>
                    £
                    {summary.orders && summary.users[0]
                      ? summary.orders[0].totalSales
                      : 0}
                  </Card.Title>
                  <Card.Text>Total Sales</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="my-3">
            <h2>Sales</h2>
            <div>
              {!summary.dailyOrders || summary.dailyOrders.length === 0 ? (
                <h1>No Orders</h1>
              ) : (
                <ChartComponent dailyOrders={summary.dailyOrders} />
                // <Chart
                //   width="100px"
                //   height="400px"
                //   chartType="AreaChart"
                //   loader={<div>Loading Chart...</div>}
                //   data={[
                //     ['Date', 'Sales'],
                //         ...(summary.dailyOrders
                //       ? summary.dailyOrders.map((x) => [x._id, x.sales])
                //       : []),
                //   ]}
                // />
              )}
            </div>
          </div>

          <div className="my-3">
            <h2>Categories</h2>
            <div>
              {!summary.productCategories ||
              summary.productCategories.length === 0 ? (
                <MessageBox>No Categories</MessageBox>
              ) : (
                <Chart
                  width="100%"
                  height="400px"
                  chartType="PieChart"
                  loader={<div>Loading Chart...</div>}
                  data={[
                    ['Category', 'Products'],
                    ...summary.productCategories.map((x) => [x._id, x.count]),
                  ]}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
