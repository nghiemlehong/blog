import React, { Component } from 'react'
import API from '../api/api';
import {Ring} from 'react-awesome-spinners';
import {Redirect} from 'react-router-dom'
 export class Login extends Component {
     constructor(props)
     {
         super(props);
         this.state={
             txtUsername : "",
             txtPass : "",
             loading : false,
             checkLogin : false
          
         }
        this.loginAdmin = this.loginAdmin.bind(this);
     }
    componentDidMount(){
        const token = localStorage.getItem('token');
        if(!token) this.setState({checkLogin:false})
        else
        {
            const objectRequest = {
                headers : {
                   token
                }
            }
            API.get("admin/user/getAll",objectRequest)
            .then(res=>{
                this.setState({checkLogin:true});
            })
            .catch(err=>alert(err))
        }

    }
     loginAdmin()
     {
         const {txtPass, txtUsername} = this.state;
         this.setState({loading: true});
         API.post("admin/login", {username: txtUsername, password: txtPass})
         .then(res=>{
            this.setState({ loading: false });
            localStorage.setItem('token',res.data.admin.token);
            this.setState({checkLogin : true});
         })
         .catch(err=>{
             this.setState({loading:false});
         })
      
         
     }
    render() {
       if(this.state.checkLogin) return <Redirect to = "/users" />
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-t-50 p-b-90">
                        <form className="login100-form validate-form flex-sb flex-w">
                            <span className="login100-form-title p-b-51">
                                Login Admin
                            </span>
                            <div className="wrap-input100 validate-input m-b-16" data-validate = "Username is required">
                                <input 
                                    className="input100" 
                                    type="text" 
                                    name="username" 
                                    placeholder="Username"
                                    value ={this.state.txtUsername}
                                    onChange = {evt => this.setState({txtUsername:evt.target.value})}
                                />
                                <span className="focus-input100"></span>
                            </div>
                            
                            
                            <div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
                                <input
                                    className="input100"
                                    type="password"
                                    name="pass"
                                    placeholder="Password"
                                    value ={this.state.txtPass}
                                    onChange = {evt => this.setState({txtPass:evt.target.value})}
                                />
                                <span className="focus-input100"></span>
                            </div>
                            
                            <div className="flex-sb-m w-full p-t-3 p-b-24">
                                <div className="contact100-form-checkbox">
                                    <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"/>
                                    <label className="label-checkbox100" for="ckb1">
                                        Remember me
                                    </label>
                                </div>

                            </div>

                            <div className="container-login100-form-btn m-t-17">
                                {
                                    this.state.loading ?
                                         <Ring/>
                                    :
                                         <button className="login100-form-btn" onClick={this.loginAdmin } >
                                                Login
                                         </button>
                                }
                                
                            </div>

                        </form>
                    </div>
                </div>
            </div>
	
        
        );
    }
}


