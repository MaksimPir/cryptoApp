import React, { useEffect, useState } from "react";
import millify from "millify";
import { Card, Row, Col, Statistic, Input } from "antd";
import {Link} from 'react-router-dom'
import { useGetCryptosQuery } from "../services/cryptoApi";
const Cryptocurrencies=({simplified})=>{
     const count=simplified?10:100;
    const {data:cryptosList, isFetching}=useGetCryptosQuery(count);
    const [cryptos, setCryptos]=useState([])
    const [searchTerm, setSearchTerm]=useState('')

    useEffect(()=>{
        console.log('11',cryptosList);
        const filteredData=cryptosList?.data.coins.filter((coin)=>coin.name.toLowerCase().includes(searchTerm.toLowerCase())
        
            )
        setCryptos(filteredData)
    },[cryptosList, searchTerm])

    if(isFetching && !cryptos) return 'Fetching'
    return(
       <>
       {
        !simplified && (<div className="search-crypto">
        <Input placeholder="Search Cryptocurrency" onChange={(e)=>setSearchTerm(e.target.value)}/>
   </div>)
       }
        <Row gutter={[32,32]} className="crypto-card-container">
            {cryptos?.map((currency)=>(
                <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
                    <Link to={`/crypto/${currency.uuid}`}>
                        <Card
                        title={`${currency.rank}. ${currency.name}`}
                        extra={<img className="crypto-image" src={`${currency.iconUrl}`} alt={`${currency.name}`}/>}
                        hoverable
                        >
                            <p>Price: {`${millify(currency.price)}$`}</p>
                            <p>Daily change: {`${millify(currency.change)}%`}</p>
                            <p>Market cap: {`${millify(currency.marketCap)}`}</p>
                        </Card>
                    </Link>
                </Col>
            ))}
        </Row>
       </>
    )
}
export  default Cryptocurrencies