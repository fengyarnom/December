import { Component } from "react";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import axios from 'axios'
import './new_post.scss'
export default class NewPost extends Component{
    constructor(props){
        super(props);
        this.state = {
            pid:'',
            title:'',
            content:'',
            tags:'',
            isTop:0,
            isNotice:0,
            isDaily:0
           
          }
    }
    componentDidMount() {
      const args = window.location.href.split('?')[1]
      
      if(args != null){
        
        axios.get('/api/modify?'+args)
        .then(res=>{
          console.log(res)
          this.setState({
            pid:res.data['pid'],
            title:res.data['title'],
            content:res.data['content'],
            tags:res.data['tags'],
            isTop:res.data['isTop'],
            isDaily:res.data['isDaily'],
            isNotice:res.data['isNotice'],
          })
        })
        
      }
      
      
    }
    handleTitleChange(e){
        this.setState({
          title: e.target.value
        });
      }
    handleContentChange(e){
        this.setState({
          content: e.target.value
        });
      }
    handleTagChange(e){
    this.setState({
        tags: e.target.value
    });
    }
    handleIsTopChange(e){
        this.setState({
          isTop: e.target.checked
        });
      }
      handleIsNoticeChange(e){
        this.setState({
          isNotice: e.target.checked
        });
      }
    handleIsDailyChange(e){
        this.setState({
          isDaily: e.target.checked
        });
      }
      send(){
        axios.post('/api/newPost',{
            data:{
              pid:this.state.pid,
              title:this.state.title?this.state.title:"??????",
              content:this.state.content,
              tags:this.state.tags,
              isTop:this.state.isTop,
              isNotice:this.state.isNotice,
              isDaily:this.state.isDaily
            }
          }).then(
            res => {
              console.log(res)
              if(res.data['code'] == 201){
                alert("??????????????????");
              }
              else if(res.data['code'] == 200){
                
                  alert("??????????????????");
              }
            }
          )
      }
      tab(e){
        if (e.keyCode == 9)
        {
          var el = document.querySelector('textarea');
          var start = el.selectionStart;
          var end = el.selectionEnd;
          el.value = el.value.substring(0, start)
                + "\t"
                + el.value.substring(end);

          el.selectionStart = el.selectionEnd = start + 1;
          
          e.preventDefault();
          
        }
      }
    render(){
        
        return(
            <div className="newPost">
                {this.state.args}
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/admin">
                    ??????
                    </Link>
                    <Link
                    underline="hover"
                    color="inherit"
                    href="/admin"
                    >
                    ????????????
                    </Link>
                    <Typography color="text.primary">??????????????????</Typography>
                </Breadcrumbs>
                <div className="post">
                    <div className="title">
                        <input type="text" value={this.state.title} onChange={this.handleTitleChange.bind(this)} placeholder="???????????????"/>
                    </div>
                    
                    <div className="content">
                        <textarea placeholder="???????????????" value={this.state.content} onChange={this.handleContentChange.bind(this)} onKeyDown={this.tab.bind(this)} ></textarea>
                    </div>
                    <Divider>
                        <Chip label="????????????" />
                    </Divider>
                    <div className="option">
                        <TextField 
                            id="outlined-basic" 
                            label="???????????????" 
                            variant="outlined"
                            helperText="??????????????????????????????????????????" 
                            value={this.state.tags}
                            onChange={this.handleTagChange.bind(this)}
                        />
                        <div className="checkbox">
                            <FormControlLabel control={<Checkbox checked={this.state.isTop} onChange={this.handleIsTopChange.bind(this)}/>} label="?????????????????????" />
                            <FormControlLabel control={<Checkbox checked={this.state.isNotice} onChange={this.handleIsNoticeChange.bind(this)}/>} label="???????????????" />
                            <FormControlLabel control={<Checkbox checked={this.state.isDaily} onChange={this.handleIsDailyChange.bind(this)}/>} label="???????????????" />
                        </div>
                        <Button variant="contained" onClick={this.send.bind(this)}>
                            ???? ?????? 
                        </Button>   

                    </div>
                </div>
            </div>
        )
    }
}