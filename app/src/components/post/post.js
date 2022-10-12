import { Component } from "react";
import ReactMarkdown from 'react-markdown' 
import { Link } from "react-router-dom"; 
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import dark from './dark' 
import './post.scss'
export class Post extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      isTop:this.props.isTop
    }
}
    render(){
        return(
                
                <div className="post">
                    
                    <div className="title">
                      {this.state.isTop?<div className="top"><span>置顶</span></div>:<span />}
                      <Link to={"/post?pid="+this.props.to}>
                        {this.props.title}
                      </Link>
                      
                    </div>
                    
                    <div className="detail">
                        <div className="date">发布时间：{this.props.date}</div>
                        <div className="tags">标签分类：{
                          this.props.tags.split(";").map((item,index) => (
                            <Link to={"/archive?condition=tags like '%"+item+"%'"} key={index}># {item}</Link>
                          ))
                        }</div>
                    </div>
                    <div className="content">
                        <ReactMarkdown
                            children={this.props.content}
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
                </div>
        )
    }
}