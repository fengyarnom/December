import { Component } from "react";
import { Link } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import "./navbar.scss"
export class Navbar extends Component{
    
    
    render(){
        return(
            <div className="navbar">
                <div className="logo">
                    <Link to="/">冯焱木的博客</Link>
                    
                </div>
                <div className="menu-list">
                    <li><Link to="/">首页</Link></li>
                    <li><Link to="/daily">日记</Link></li>
                    <li><Link to="/archive">归档</Link></li>
                    {
                            /Mobi|Android|iPhone/i.test(navigator.userAgent)?
                            <li><Link to="/login">登录</Link></li>
                            :<span></span>
                    }
                </div>
                <div className="option">
                    <Link to="/login">登录</Link>
                </div>
            </div>
            
        )
    }
}

