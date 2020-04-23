import React, { Component } from 'react'
import axios from 'axios';
import {Ring} from 'react-awesome-spinners';
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
 export class LoginComponent extends Component {
     constructor(props)
     {
         super(props);
         this.state={
             txtUsername : "",
             txtPass : "",
             loading : false,
          
         }
        this.loginAdmin = this.loginAdmin.bind(this);
     }
     loginAdmin()
     {
         const {txtPass, txtUsername} = this.state;
         const {dispatch} = this.props;
         this.setState({loading: true});
         const url = "https://blog-nghiemle.herokuapp.com/user/signin-admin";
         axios.post(url, {username: txtUsername, password: txtPass})
         .then(res=>{
            this.setState({ loading: false });
            dispatch({type:"LOGIN"});
           
         })
         .catch(err=>{
             this.setState({loading:false});
            
           
         })
      
         
     }
    render() {
        if(this.props.checkLogin) return <Redirect to = "/admin"/>
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-t-50 p-b-90">
                        <form className="login100-form validate-form flex-sb flex-w">
                            <span className="login100-form-title p-b-51">
                                Login
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

const mapState = state => ({checkLogin : state.checkLogin});
export const Login = connect(mapState)(LoginComponent);
