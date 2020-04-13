import React, { Component } from 'react'

 export class Login extends Component {
    render() {
        return (
            <div class="form-group">
                <label for="">Tên đăng nhập</label>
                <input type="text"
                class="form-control" name="" id="" aria-describedby="helpId" placeholder=""/>
                <small id="helpId" class="form-text text-muted">Help text</small>
                <label for="">Mật khẩu</label>
                <input type="password"
                class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />
                <small id="helpId" class="form-text text-muted">Help text</small>
                <button type="button" class="btn btn-success">Đăng nhập </button>
            </div>
        );
    }
}