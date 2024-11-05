import React from 'react';
import Chart from 'react-google-charts';

const ChartComponent = ({ dailyOrders }) => (
  <Chart
    width="100%"
    height="400px"
    chartType="AreaChart"
    loader={<div>Loading Chart...</div>}
    data={[['Date', 'Sales', 'Orders'], 
        ...dailyOrders.map((x) => [x._id, x.sales, x.orders])
    ]}
  />
);

export default ChartComponent;
