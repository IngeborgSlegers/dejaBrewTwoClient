import React, {useState, useEffect } from 'react';
import HeroImage from './layout/Hero/HeroImage';
import AllTeas from './layout/Teas/AllTeas';
import Nav from './layout/Navbar/Nav';
import Auth from './Auth/Auth';
import Profile from './Auth/Profile';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import MainTea from './layout/Teas/MainTea';
import TeaType from './layout/Teas/Types/TeaType/TeaType';
import Tea from './layout/Teas/Tea/Tea';
import SideDrawer from './layout/SideBar';

const App = () => {

  const [sessionToken, setSessionToken] = useState(undefined);
  const [teaId, setTeaId] = useState(0);
  const [sideBar, setSideBar] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log(sessionToken);
      setSessionToken(localStorage.getItem('token'));
    }
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    console.log(anchor, open)
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    // getTeaId();
  }, [setTeaId]);

  const getTeaId = (newTeaId) => {
    setTeaId(newTeaId);
  }
  
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

  const toggleSidebar = () => {
    setSideBar(!sideBar)
  }

  return (
    <div className="App">
      <Router>
        <Nav logout={logout} setToken={setToken} sessionToken={sessionToken} />
        <HeroImage />
        <h1 onClick={() => {toggleSidebar()}}>Click me to open the cart!</h1>
        {sideBar ? (
        <SideDrawer />
      ) : null}
        <Switch>
            <Route exact path='/'><MainTea/></Route>
            <Route exact path='/allteas'><AllTeas getTeaId={getTeaId}/></Route>
            <Route exact path='/teaType'><TeaType getTeaId={getTeaId}/></Route>
            <Route exact path='/tea' render={() => (teaId === 0 ? (<Redirect to="/teaType" />) : (<Tea teaId={teaId} />))} />
            {/* <Route exact path='/tea'><Tea teaId={teaId}/></Route> */}
            <Route exact path='/auth'><Auth setToken={setToken} sessionToken={sessionToken} /></Route>
            <Route exact path='/profile' render={() => (sessionToken === undefined ? (<Redirect to="/auth"/>) : ( <Profile sessionToken={sessionToken}/> ) ) } />
        </Switch>  
      </Router>
    </div>
  );
  
}

export default App;
