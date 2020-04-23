import React, { Component } from 'react';
import {Link,Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
export  class AdminComponent extends Component {
    render() {
    
        return (
            <div>
                <div>ĐÂY LÀ TRANG ADMIN, CHỈ CÓ ADMIN MỚI NHÌN THẤY </div>

                
                <Link to ="/logout">LOG OUT</Link>
            </div>
           
        );
    }
}

 const mapState = state => ({checkLogin : state.checkLogin})
 export const Admin = connect(mapState)(AdminComponent);
