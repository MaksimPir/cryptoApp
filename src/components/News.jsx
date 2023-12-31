import React, { useState } from "react";
import {Slect, Row, Typography, Col,Avatar,Card, Select} from 'antd'
import moment from "moment";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
const{Text, Title}=Typography;
const{Option}=Select;

const News=({simplified})=>{
    const [newsCategory,setNewsCategory]=useState('Cryptocurrency')
    const {data, isFetching}=useGetCryptosQuery(100)
    const count= simplified?6:12;
    const demoImageUrl='https://isradar.com/upload/no-image.jpg'
    const {data:cryptoNews, isFetchingNews} =useGetCryptoNewsQuery({newsCategory,count})
    if((isFetching || isFetchingNews) && (!cryptoNews ||!data)) return 'Fetching'
    else console.log('1',cryptoNews,'2',data);
    return(
      <Row gutter={[24,24]}>
        {!simplified &&(
            <Col span={24}>
                <Select 
                    showSearch
                    className="select-news"
                    placeholder='Select a Crypto'
                    optionFilterProp="children"
                    onChange={(value)=>setNewsCategory(value)}
                    filterOption={(input, option)=>option.children.toLowerCase().indexOf(input.toLowerCase())>=0}
                >
                    <Option value='Cryptocurrency'>Cryptocurrency</Option>
                    {data?.data?.coins?.map((coin,i)=>(<Option key={i} value={coin.name}>{coin.name}</Option>))}
                </Select>
            </Col>
        )}
        {cryptoNews?.value.map((news,i)=>
            {
                return(
                    <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={4}>{news.name}
                                </Title>
                                <img  style={{maxHeight:'100px', maxWidth:'200px'}} src={news?.image?.thumbnail?.contentUrl||demoImageUrl} alt='news'></img>
                            </div>
                            <p>
                                {news.description.length>100?news.description.substring(0,100)+'...':news.description}
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl||demoImageUrl} alt="news"/>
                                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
                )
            }
           
        )}
      </Row>
    )
}
export  default News