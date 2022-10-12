import { Component } from "react";
import axios from "axios";
import "./Notice.scss"
export default class Notice extends Component{
    constructor(props){
        super(props);
        this.state = {
            postArr: []
        }

    }
    componentDidMount() {
        axios.get("/api/seleteTable?class=NOTICE&order_by=pid&desc=desc&condition=visible=1")
        .then(res => {
          this.setState({
              postArr:res.data.data,
          })   
         
        })
    }
    render() {
      return (
          <div className="notices">
            {  
            this.state.postArr.map((item,index) => (
                <div className="notice" key={index}>
                    <div className="title">{item['title']}</div>
                    <div className="content">
                        {item['content']}
                    </div>
                </div>
            ))}
          </div>
           
        )
    }
}