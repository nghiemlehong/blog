import React, { Component } from 'react'
import axios from 'axios';
import {Circle} from 'react-awesome-spinners'
 export class Login extends Component {
     constructor(props)
     {
         super(props);
         this.state={
             txtUsername : "",
             txtPass : "",
             loading : true
          
         }
        this.loginAdmin = this.loginAdmin.bind(this);
     }
     loginAdmin()
     {
         const {txtPass, txtUsername} = this.state;
         this.setState({loading: false});
         const url = "https://blog-nghiemle.herokuapp.com/user/signin-admin";
         axios.post(url, {username: txtUsername, password: txtPass})
         .then(res =>{
            this.setState({loading: true});
             alert(`Đã đăng nhập ${res.data.success}`);
            })
         .catch(err => {
            this.setState({loading: true});
             alert(`Đăng nhập thất bại ${err.response.data.success}`);  
            })
         
     }
    render() {
        return (
            <div className="form-group">
                <label for="">Tên đăng nhập</label>
                <input 
                    type="text"
                    className="form-control" 
                    value ={this.state.txtUsername}  
                    onChange={evt=>this.setState({txtUsername: evt.target.value}) }  
                />
                <label for="">Mật khẩu</label>
                <input 
                    type="password"
                    className="form-control" 
                    value ={this.state.txtPass}  
                    onChange={evt=>this.setState({txtPass: evt.target.value}) }  
                   
                />
                {
                 this.state.loading?
                 <button type="button" className="btn btn-success" onClick={this.loginAdmin}>Đăng nhập </button>
                 :    
                 <div>
                     <h2>Loading</h2> 
                     <Circle/>  
                 </div>
                }
            </div>
        );
    }
}

