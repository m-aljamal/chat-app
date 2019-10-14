import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
function App() {
  
  return (
    <div className="App">
    <Switch>
      <Route exact path='/'/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/register' component={Register}/>
    </Switch>
    </div>
  );
}

export default App;
