import React, { Component } from 'react';
import './App.css';
import Manager from './Container/Manager';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from './Container/SignUp';
import Login from './Container/Login';
import Userlist from './Container/UserList';

class App extends Component {

  state = {
    myUserData: null
  }


  _handleLogin = (data) => {
    this.setState({
      myUserData: data
    })
    return 1;
  }

  _handleLogout = () => {
    this.setState({
      myUserData: null
    });
    return 1;
  }

  render() {
    console.log(this.state.myUserData)
    return (
      <BrowserRouter>
        <div className='container'>
          <Switch>
            <Route exact path='/' render={(props) => {
              return <Manager {...props} myUserData={this.state.myUserData} />
            }} />
            <Route exact path='/Signup' render={(props) => {
              return <SignUp {...props} myUserData={this.state.myUserData} />
            }} />
            <Route exact path='/Login' render={(props) => {
              return <Login {...props} myUserData={this.state.myUserData} handleLogin={this._handleLogin} />
            }} />
            <Route exact path='/Userlist' render={(props) => {
              return (this.state.myUserData) ? <Userlist {...props} myUserData={this.state.myUserData} handleLogout={this._handleLogout} /> : (window.location.href='/')
            }} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
