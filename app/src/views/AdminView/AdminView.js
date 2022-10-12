import { Component } from "react";
import * as React from 'react';
import { Link, Outlet } from "react-router-dom";

import axios from "axios";

import './AdminView.scss'

export default class AdminView extends Component{
    constructor(props){
        super(props);
        this.state={
            postCount:0,
            dailyCount:0,
            tagCount:0
        }
    }
    componentDidMount() {
        const data = {
            authorized:this.getCookie('authorized')
        }
        if(data['authorized'] !== ""){
            axios.post('/api/authorize', { data })
            .then(res => {
                if(res.data['class'] === 'status'){
                    if(res.data['value'] === 1){
                              
                    }
                    else{
                        window.location.replace("/login");
                    }
                    
                }
            })
        }else{
            window.location.replace("/login");
        }

        axios.get('/api/getTableCount/POST')
        .then(res => {
           
            if(res.data['code'] == 200){
                this.setState({
                    postCount:res.data['data']
                })
            }
        })

        axios.get('/api/getTableCount/DAILY')
        .then(res => {
            
            if(res.data['code'] == 200){
                this.setState({
                    dailyCount:res.data['data']
                })
            }
        })

        axios.get('/api/getTableCount/Notice?condition=visible=1')
        .then(res => {
            if(res.data['code'] == 200){
                this.setState({
                    tagCount:res.data['data']
                })
            }
        })
        
    }

    getCookie(cname)
    {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) 
        {
            var c = ca[i].trim();
            if (c.indexOf(name)===0) return c.substring(name.length,c.length);
        }
        return ""
    }


    render(){
        return(
            <div className="AdminView">
                <div className="header">仪表板</div>
                <div className="main">
                    <div className="overview">
                        <div className="header">
                            <div className="title"><h3>概述</h3></div>
                        </div>
                        <div className="content">
                            <Link className="item" to="/admin">
                                <div className="header">文章</div>
                                <div className="number">{this.state.postCount}</div>
                                <div className="unit">篇</div>
                            </Link>
                            <Link className="item" to="/admin/daily">
                                <div className="header">日记</div>
                                <div className="number">{this.state.dailyCount}</div>
                                <div className="unit">段</div>
                            </Link>
                            <Link className="item" to="/admin/notice">
                                <div className="header">通告</div>
                                <div className="number">{this.state.tagCount}</div>
                                <div className="unit">篇</div>
                            </Link>
                        </div>
                        
                        
                    </div>
                    
                    
                    <Outlet />
                    
                </div>

            </div>
            
                

        )
    }

}

