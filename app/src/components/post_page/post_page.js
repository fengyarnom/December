import { Component } from "react";
import ReactMarkdown from 'react-markdown' 
import { Link } from "react-router-dom"; 
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import axios from "axios";
import dark from './dark' 
import './post_page.scss'
export default class POST_PAGE extends Component{
    constructor(props){
        super(props);
        this.state = {
            postArr:[]
        }
    }
    componentDidMount() {
        var query = window.location.search.substring(1);
        axios.get("/api/seleteTable?class=POST&condition="+query)
        .then(res => {
          this.setState({
              postArr:res.data['data'][0],
          })   
         
        })
    }
    render(){
        return(
                <div className="post_page">
                    
                    <div className="title">
                      <Link to="">
                        {this.state.postArr['title']} 
                      </Link>
                      
                    </div>
                    
                    <div className="detail">
                        <div className="date">{this.state.postArr['create_date']} </div>
                        
                    </div>
                    <div className="content">
                        <ReactMarkdown
                            children={this.state.postArr['content']}
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
                    <div className="tags">
                        {
                          this.state.postArr['tags']?
                          this.state.postArr['tags'].split(";").map((item,index) => (
                            <Link to={"/archive?condition=tags like '%"+item+"%'"} key={index}># {item}</Link>
                          )):
                          <div></div>
                        }
                    
                        
                    </div>
                </div>
        )
    }
}