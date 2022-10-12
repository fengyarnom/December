import { Component } from "react";
import { Post } from "../post/post";
import axios from "axios";
import './article.scss'
export default class Article extends Component{
    constructor(props){
        super(props);
        this.state = {
            topPostArr: [],
            postArr:[]
        }

    }

    componentDidMount() {
        axios.get("/api/seleteTable?class=POST&order_by=pid&desc=desc&condition=is_top=1")
          .then(res => {
                this.setState({
                    topPostArr:res.data.data,
                })   
           
          })
          axios.get("/api/seleteTable?class=POST&order_by=pid&desc=desc&condition=is_top=0&limit=5")
          .then(res => {
                this.setState({
                    postArr:res.data.data,
                })   
           
          })
      }
    render(){
        return(
            <div className="article">   
                {  
                    this.state.topPostArr.map((item,index) => (
                        <Post      
                            to={item['pid']} 
                            key = {item['pid']} 
                            title={item['title']} 
                            date={item['create_date']} 
                            tags={item['tags']} 
                            content={item['content']}
                            isTop={item['isTop']}
                        ></Post>
                    ))
                }
                {  
                    this.state.postArr.map((item,index) => (
                        <Post      
                            to={item['pid']} 
                            key = {item['pid']} 
                            title={item['title']} 
                            date={item['create_date']} 
                            tags={item['tags']} 
                            content={item['content']}
                            isTop={item['isTop']}
                        ></Post>
                    ))
                }
                
               
            </div>
        )
    }
}