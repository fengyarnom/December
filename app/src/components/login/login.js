import { Component } from "react";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios'
import './login.scss'
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
            password:"",
            error:""
        }
    }

    componentDidMount() {
        const data = {
            authorized:this.getCookie('authorized')
        }
        if(data['authorized'] != ""){
            axios.post('/api/authorize', { data })
            .then(res => {
                console.log(res)
                if(res.data['code'] == 301){      
                    window.location.replace("/admin");      
                }
            })
        }
        
    }
    getCookie(cname)
    {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) 
        {
            var c = ca[i].trim();
            if (c.indexOf(name)==0) return c.substring(name.length,c.length);
        }
        return ""
    }
    handleUsernameChange = (e)=>{
        this.setState({
            username: e.target.value,
        })
    };
    handlePasswordChange = (e)=>{
        this.setState({
            password: e.target.value,
        })
    };
    handleLoginClick(){
        const data = { 
            username: this.state.username,
            password: this.state.password 
        };
        if(data['username'] == "" | data['password'] == ""){
            this.setState({
                error:"输入不允许为空",
                password:""
            })
            return 0;
        }
        axios.post('/api/login', { data })
        .then(res => {
            if(res.data['code'] == 410){
                this.setState({
                    error:"[ " + data['username'] + " ] 用户不存在,请重新检查",
                    password:""
                })
            }
            else if(res.data['code'] == 411){
                this.setState({
                    error:"用户名或密码错误,请重新检查",
                    password:""
                })
            }
            else if(res.data['code'] == 301){
                document.cookie="username="+data['username'];
                document.cookie="authorized="+res.data['data'];
                window.location.replace("/admin");
            }
          })

    }

    render(){
        return(
            <div className="login">
                <div className="header">
                😸 登录
                </div>
                <Alert severity="info">你好，欢迎进入后台管理，在进入之前请完成登录操作。</Alert>
                {
                this.state.error ? <Alert severity="error"> {this.state.error} </Alert> : <span></span>
                }
                <form action=""> 
                    
                    <TextField error={this.state.error? true : false} id="outlined-basic" label="用户名" variant="outlined" margin="dense" value={this.state.username} onChange={this.handleUsernameChange}/>
                    <TextField error={this.state.error? true : false} id="outlined-basic" label="密码" variant="outlined" type="password" margin="dense" value={this.state.password} onChange={this.handlePasswordChange}/>
                    <Button onClick={this.handleLoginClick.bind(this)} variant="contained" endIcon={<SendIcon />} margin="normal" >
                     发送
                    </Button>
                </form>
            </div>
        )
    }
}