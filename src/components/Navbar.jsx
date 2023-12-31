import React from "react";
import { Button, Menu, Typography, Avatar} from "antd";
import {Link} from 'react-router-dom'
import { HomeOutlined,MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from "@ant-design/icons";
import icon from '../images/logo.png' 

const Navbar=()=>{
    return(
       <div className="nav-container">
        <div className="logo-container">
        <Avatar src={icon} size={"large"}/>
        <Typography.Title level={2} className="logo">
            <Link to='/'>Cryptoverse</Link>
        </Typography.Title>
        </div>
       
       <Menu theme="dark">
            <Menu.Item key='1' icon={<HomeOutlined/>} >
                <Link to='/'>Home</Link>
            </Menu.Item>
            <Menu.Item key='2'  icon={<FundOutlined/>}>
                <Link to='/cryptocurrencies'>CryptoCurrencies</Link>
            </Menu.Item>
            <Menu.Item  key='4' icon={<MoneyCollectOutlined/>}>
                <Link to='/news'>News</Link>
            </Menu.Item>
       </Menu>
       </div>
    )
}
export  default Navbar