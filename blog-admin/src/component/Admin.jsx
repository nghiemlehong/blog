import React, { Component } from 'react';
import {Link} from 'react-router-dom'
export  class Admin extends Component {
    render() {
    
        return (
            <div>
                <div>ĐÂY LÀ TRANG ADMIN, CHỈ CÓ ADMIN MỚI NHÌN THẤY </div>
                <Link to ="/logout">LOG OUT</Link>
            </div>
           
        );
    }
}


