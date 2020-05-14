import React, { Component } from 'react';
import {Redirect,Link} from 'react-router-dom'
import API from '../api/api'
export  class Users extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            users : [],
            checkLogin : true
        }
    }
    componentDidMount(){
        const token = localStorage.getItem('token');
        if(!token) this.setState({checkLogin : false})
        else{
            const objectRequest = {
                headers : {
                    token 
                }
            }
            API.get("admin/user/getAll",objectRequest)
            .then(res => {
               this.setState({checkLogin: true,users : res.data.users});    
            })
            .catch(err =>
                {
                   alert(err);
                })
        }
     
    }
   
    
    render() {
        if(!this.state.checkLogin) return <Redirect to ="/404" />
        return (
            <div>
                    <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    {
                        this.state.users.map((user)=>{
                            return ( 
                                <tr>
                                    <td>{user._id}</td>
                                    <td>{ user.email  }</td>
                                    <td>{user.name}</td>
                                </tr>
                            );
                        })
                    }
                    <tbody>
                        <tr>
                        
                        </tr>
                    </tbody>
                    </table>    
                   
            </div>
         
        );
    }
}