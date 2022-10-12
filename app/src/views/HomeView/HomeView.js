import { Component } from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from "../../components/navbar/navbar";
import { Siderbar } from "../../components/siderbar/siderbar";
import "./HomeView.scss"
export default class HomeView extends Component{
    render(){
        return(
            <div className="content">
                <header>
                    <div className="nav-area">
                        <Navbar/>
                    </div>
                    
                </header>
                
                <div className="main">
                    <div className="main-area">
                        <div id="article-area">
                            <Outlet />
                        </div>
                        <Siderbar></Siderbar>
                    </div>  
                </div>
                
            </div>
            
        )
    }
}

