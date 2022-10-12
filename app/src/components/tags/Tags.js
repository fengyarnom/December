import { Component } from "react";
import { Link } from "react-router-dom"
import "./Tags.scss"
import axios from "axios";
export default class Tags extends Component{
    constructor(props){
      super(props);
      this.state = {
        tagArr : []
      }
    }
    componentDidMount() {
      axios.get('/api/seleteTable?class=TAG&order_by=count&desc=desc&limit=20')
      .then(res => { 
          this.setState({
            tagArr:res.data.data
          })
  
      })
      
    }
    render() {
      return (
          <div className="Tags">
              <div className="header">
                <div className="title">标签</div>
              </div>
              <div className="list">
              {
                this.state.tagArr.map((item,index) => (
                    <Link to={"/archive?condition=tags like '%"+item['name']+"%'"} key={index}>{item['name']} <span>{item['count']}</span></Link>
                  ))
                }

              </div>
          </div>
        )
    }
}