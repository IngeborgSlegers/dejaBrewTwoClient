import React, {useState, useEffect } from 'react';
import HeroImage from './layout/Hero/HeroImage';
import AllTeas from './layout/Teas/AllTeas';
import Nav from './layout/Navbar/Nav';
import Auth from './Auth/Auth';
import Profile from './Auth/Profile';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import MainTea from './layout/Teas/MainTea';
import TeaType from './layout/Teas/Types/TeaType/TeaType';

const App = () => {

  const [sessionToken, setSessionToken] = useState(undefined);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log(sessionToken);
      setSessionToken(localStorage.getItem('token'));
    }
  }, []);

  
  const setToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken({newToken});
    console.log(sessionToken);
  };
  
  const logout = () => {
    setSessionToken({sessionToken: ''});
    localStorage.clear();
    alert('You are now logged out!')
  }

  return (
    <div className="App">
      <Router>
        <Nav logout={logout} setToken={setToken} sessionToken={sessionToken} />
        <HeroImage />
        <Switch>
            <Route exact path='/'><MainTea/></Route>
            <Route exact path='/allteas'><AllTeas/></Route>
            <Route exact path='/teaType'><TeaType/></Route>
            <Route exact path='/auth'><Auth setToken={setToken} sessionToken={sessionToken} /></Route>
            <Route exact path='/profile' render={() => (sessionToken === undefined ? (<Redirect to="/auth"/>) : ( <Profile sessionToken={sessionToken}/> ) ) } />
        </Switch>  
      </Router>
    </div>
  );
  
}

export default App;
