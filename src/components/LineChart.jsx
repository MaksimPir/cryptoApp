import React from "react";
import {Line} from 'react-chartjs-2';
import {Col,Row,Typography} from 'antd'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
  } from 'chart.js'
  import { Chart } from 'react-chartjs-2'
  
const {Title}=Typography;
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
  )


const LineChart=({coinHistory, currentPrice, coinName})=>{
    const coinPrice=[];
    const coinTimestamp=[];
    console.log(coinHistory?.data.history);
    coinHistory?.data.history.forEach((el)=>{
        coinPrice.push(el.price)
        coinTimestamp.push(new Date(el.timestamp))
    })
    console.log(coinTimestamp);
    const data={
        labels:coinTimestamp,
        datasets:[
            {
                label:'Price in USD',
                data:coinPrice, 
                fill:false,
                backgroundColor:'#0071bd',
                borderColor:'#0071bd'
            }
        ]
    }
    const options={
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
    return(
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">
                    {coinName} Price Chart
                </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">
                        {coinHistory?.data?.change}
                    </Title>
                    <Title level={5} className="current-price">
                        Current {coinName} Price: ${currentPrice}
                    </Title>
                </Col>
            </Row>
            <Line data={data} options={options}/>
        </>
    )
}
export default LineChart