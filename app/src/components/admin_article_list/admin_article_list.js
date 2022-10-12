import { Component } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Pagination from '@mui/material/Pagination';
import Alert from '@mui/material/Alert';
import axios from "axios";
import './admin_article_list.scss'
export default class AdminAritleList extends Component{
    constructor(props){
        super(props);
        this.state = {
            postArr: [],
            page:1,
            postCount:0,
            error_flag:false,
            error_message:"",
        }

    }

    componentDidMount() {

        axios.get("/api/seleteTable?class=POST&order_by=pid&desc=desc&limit=5")
        .then(res => {
            this.setState({
                postArr:res.data.data,
            })   
        })
        
        axios.get('/api/getTableCount/POST')
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
        axios.get('/api/seleteTable?class=POST&order_by=pid&desc=desc&limit=5&offset='+offset)
          .then(res => {
            this.setState({
                postArr:res.data.data,
            })
                
           
          })
      }
    handleDelete(index,pid,title){
        if((window.confirm("您确定要删除文章《 "+title+" 》 吗"))){
            axios.post('/api/delete/POST/pid='+pid)
            .then(res => {
                if(res.data['code'] == 200){ 
                    const arr = this.state.postArr
                    arr.splice(index,1)
                    this.setState({
                        postArr:arr,
                    })
                }
                else if(res.data['code'] == 401){
                    this.setState({
                        error_flag:true,
                        error_message:res.data['message']
                    })
                }
                    
            
            })
        }
    }
    render(){
        return(
            <div className="AdminAritleList">
                {
                    this.state.error_flag
                    ?<Alert severity="error">{this.state.error_message}</Alert>
                    :<span></span>
                
                }
                <div className="header">
                    <div className="title"><h3>文章管理</h3></div>
                    <Link to="/newPost"><Button variant="contained">写一篇新文章</Button></Link>
                </div>
                <div className="content">
                <TableContainer component={Paper}>
                    <Table  sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">标题</TableCell>
                            <TableCell align="center">发布时间</TableCell>
                            <TableCell align="center">标签</TableCell>
                            <TableCell align="center">操作</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {  
                        this.state.postArr.map((item,index) => (
                            <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            
                            key={index}>

                            <TableCell align="center">{item['title']}</TableCell>
                            <TableCell align="center">{item['create_date']}</TableCell>
                            <TableCell align="center">{item['tags']} </TableCell>
                            <TableCell align="center">
                                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                    <Button><Link to={"/newPost?class=post&pid="+item['pid']}>修改</Link></Button>
                                    <Button onClick={this.handleDelete.bind(this,index,item['pid'],item['pid'])}>删除</Button>
                                    
                                </ButtonGroup>
                                </TableCell>
                            </TableRow> 
                            ))
                        }
                        
                        </TableBody>
                            
                        </Table>
                        
                            <Pagination count={this.state.postCount} variant="outlined" shape="rounded" page={this.state.page} onChange={this.handlePageChange.bind(this)} />
                        
                        </TableContainer>
                </div>
            </div>
            
        )
    }
}