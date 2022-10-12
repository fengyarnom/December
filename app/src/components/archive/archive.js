import { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import axios from "axios";
import './archive.scss'
export default class Archive extends Component{
    constructor(props){
        super(props);
        this.state = {
            page:1,
            postCount:0,
            postArr: []
        }

    }

    componentDidMount() {
          var query = window.location.search.substring(1);
          axios.get("/api/seleteTable?class=POST&order_by=pid&desc=desc&limit=5&"+query)
          .then(res => {
            this.setState({
                postArr:res.data.data,
            })   
           
          })
          axios.get("/api/getTableCount/POST?"+query)
          .then(res => {
              if(res.data['code'] == 200){
                  this.setState({
                      postCount:Math.ceil(res.data['data']/5)
                  })
              }
          })
      }
      handlePageChange = (event, value) => {
        this.setState({
            page:value
        })
        var offset = 5 * (value-1)
        var query = window.location.search.substring(1);
        
        axios.get('/api/seleteTable?class=POST&order_by=pid&desc=desc&limit=5&offset='+offset+"&"+query)
          .then(res => {
            this.setState({
                postArr:res.data.data,
            })
          })
      }
    render(){
        return(
            <div className="archive">
                <div className="header">
                        <span>📦 归档&nbsp;&nbsp;</span>
                </div>
                {  
                    this.state.postArr.map((item,index) => (
                        <div className="item" key={index}>
                            <div className="title"><Link to={"/post?pid="+item['pid']}>{item['title']}</Link></div>
                            <div className="date">{item['create_date']}</div>
                        </div>
                
                    ))
                }
                <Pagination count={this.state.postCount} page={this.state.page} onChange={this.handlePageChange.bind(this)} />
            </div>
        )
    }
}

