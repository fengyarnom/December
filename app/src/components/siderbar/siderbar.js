import { Component } from "react";
import { Link } from "react-router-dom";
import Notice from "../notice/Notice";
import Tags from "../tags/Tags";
import axios from "axios";
import { Suspense } from 'react'
import './siderbar.scss'

export class Siderbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            postArr: []
        }

    }
    componentDidMount() {
          axios.get("/api/seleteTable?class=POST&order_by=pid&desc=desc&limit=10")
          .then(res => {
            this.setState({
                postArr:res.data.data,
            })   
           
          })
      }
    render(){
        return(
            <Suspense fallback={<div>Loading</div>}>
                <div className="siderbar">
                <Notice></Notice>
                
                <Tags></Tags>
                <div className="recent-posts">
                    <div className="header">
                        <div className="title">最近的文章</div>
                    </div>
                    {  
                    this.state.postArr.map((item,index) => (
                        <li key={index}><Link to="">{item['title']}</Link></li>
                    
                    ))
                    }
                </div>
                
            </div>
            </Suspense>
            
        )
    }
}