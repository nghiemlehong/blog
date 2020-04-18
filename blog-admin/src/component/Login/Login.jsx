import React, { Component } from 'react'
import axios from 'axios';
import {Circle} from 'react-awesome-spinners'
import './css/main.css';
import './css/util.css';
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
            <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-form-title" >
					<span class="login100-form-title-1">
						Sign In
					</span>
				</div>

				<form class="login100-form validate-form">
					<div class="wrap-input100 validate-input m-b-26" data-validate="Username is required">
						<span class="label-input100">Username</span>
						<input class="input100" type="text" name="username" placeholder="Enter username"/>
						<span class="focus-input100"></span>
					</div>

					<div class="wrap-input100 validate-input m-b-18" data-validate = "Password is required">
						<span class="label-input100">Password</span>
						<input class="input100" type="password" name="pass" placeholder="Enter password"/>
						<span class="focus-input100"></span>
					</div>

					<div class="flex-sb-m w-full p-b-30">
						<div class="contact100-form-checkbox">
							<input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"/>
							<label class="label-checkbox100" for="ckb1">
								Remember me
							</label>
						</div>

						<div>
							<a href="#" class="txt1">
								Forgot Password?
							</a>
						</div>
					</div>

					<div class="container-login100-form-btn">
						<button class="login100-form-btn">
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
        );
    }
}
