import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Admin} from './component/Admin';
import {Login} from './component/Login';
import {Users} from './component/Users';
import {Table} from './component/Table'
import {Logout} from './component/Logout'
import './css/main.css';
import './css/util.css';
import {Route, Switch} from 'react-router-dom'
import {Provider} from"react-redux";
import {store} from './redux/store'

function App() {
  return (
    <Provider store ={store}>
      <Switch>
      <Route exact path="/" component={Login}/>
        <Route exact path="/users" component={Users}/>
        <Route exact path="/table" component={Table}/>
        <Route exact path="/admin" component={Admin}/>
        <Route exact path="/logout" component={Logout}/>
      </Switch>
    </Provider>
     
  );
}

export default App;
