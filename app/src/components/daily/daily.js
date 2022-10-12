import { Component } from "react";
import Pagination from '@mui/material/Pagination';
import axios from "axios";
import ReactMarkdown from 'react-markdown' 
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import dark from './dark' 
import "@fontsource/noto-serif-sc";

import './daily.scss'
export default class Daily extends Component{
    constructor(props){
        super(props);
        this.state = {
            page:1,
            postCount:0,
            postArr: []
        }

    }
    handlePageChange = (event, value) => {
        this.setState({
            page:value
        })
        var offset = 5 * (value-1)
        axios.get('/api/seleteTable?class=Daily&order_by=pid&desc=desc&limit=5&offset='+offset)
          .then(res => {
            this.setState({
                postArr:res.data.data,
            })
          })
      }
    componentDidMount() {

          axios.get("/api/seleteTable?class=DAILY&order_by=pid&desc=desc&limit=5")
          .then(res => {
            this.setState({
                postArr:res.data.data,
            })   
           
          })

          axios.get('/api/getTableCount/Daily')
          .then(res => {
           
              if(res.data['code'] == 200){
                  this.setState({
                      postCount:Math.ceil(res.data['data']/5)
                  })
              }
          })
      }
    render(){
        return(
            <div className="daily">
                <div className="header">
                    <span>😛 日记&nbsp;&nbsp;</span>
                </div>
                {  
                    this.state.postArr.map((item,index) => (
                        <div className="card" key={index}>
                            <div className="title"><h2>{item['title']}</h2></div>
                            <div className="date">{item['create_time']}</div>
                            <div className="content">
                                <ReactMarkdown
                                children={item['content']}
                                components={{
                                    code({ node, inline, className, children, ...props }) {
                                        const match = /language-(\w+)/.exec(className || '');
                                        return !inline && match ? (
                                        <SyntaxHighlighter
                                            style={dark}
                                            language={match[1]}
                                            PreTag="pre"
                                            {...props}
                                        >
                                            {String(children).replace(/\n$/, '')}
                                        </SyntaxHighlighter>
                                        ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                        );
                                    },
                                }}
                            />
                                
                            </div>
                            <hr />
                        </div>

                    ))
                    }
                
                <Pagination count={this.state.postCount} page={this.state.page} onChange={this.handlePageChange.bind(this)} />
            </div>
        )
    }
}

