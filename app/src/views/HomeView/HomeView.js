import { lazy,Suspense } from 'react'
import { Component } from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from "../../components/navbar/navbar";
// import { Siderbar } from "../../components/siderbar/siderbar";
import LinearProgress from '@mui/material/LinearProgress';
import "./HomeView.scss"
export default class HomeView extends Component{
    render(){
        const Siderbar = lazy(() => import('../../components/siderbar/siderbar'));
        
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
                            <Suspense fallback={<LinearProgress />}>                              
                                    <Outlet />
                            </Suspense>
                        </div>
                        <Suspense fallback={<div></div>}>
                            <Siderbar></Siderbar>
                        </Suspense>
                        
                    </div>  
                </div>
                
            </div>
            
        )
    }
}

