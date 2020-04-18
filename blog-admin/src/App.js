import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AdminComponent} from './component/Admin';
import {Login} from './component/Login/Login';
import {Users} from './component/Users';
import {Table} from './component/Table'
import './App.css'
import {Route} from 'react-router-dom'

function App() {
  return (
     <div className="App">
       <Route exact path="/" component={Login}/>
       <Route exact  path="/admin" component={AdminComponent}/>
       <Route exact path="/users" component={Users}/>
       <Route exact path="/table" component={Table}/>
     </div>
  );
}

export default App;
