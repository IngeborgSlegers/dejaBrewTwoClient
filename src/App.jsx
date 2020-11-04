import React, { useState, useEffect } from "react";
import HeroImage from "./layout/Hero/HeroImage";
import AllTeas from "./layout/Teas/AllTeas";
import Nav from "./layout/Navbar/Nav";
import Auth from "./Auth/Auth";
import Profile from "./Auth/Profile";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import MainTea from "./layout/Teas/MainTea";
import TeaType from "./layout/Teas/Types/TeaType/TeaType";
import Tea from "./layout/Teas/Tea/Tea";
import SideDrawer from "./layout/SideBar";
import TeaInventory from "./layout/Admin/TeaInventory/TeaInventory";

const history = createBrowserHistory();
const App = () => {
  const [sessionToken, setSessionToken] = useState(undefined);
  const [teaId, setTeaId] = useState(0);
  const [sideBar, setSideBar] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log(sessionToken);
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    // console.log()
  }, [setTeaId]);

  console.log(history.location);

  const getTeaId = (newTeaId) => {
    setTeaId(newTeaId);
  };

  const setToken = (newToken) => {
    console.log(newToken);
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };

  const logout = () => {
    setSessionToken({ sessionToken: "" });
    localStorage.clear();
    alert("You are now logged out!");
  };

  const toggleSidebar = () => {
    setSideBar(!sideBar);
  };

  const setAdminRole = () => {
    setAdmin(true);
  };

  return (
    <div className="App">
      <Router history={history}>
        <Nav logout={logout} setToken={setToken} sessionToken={sessionToken} />
        <HeroImage />
        {/* <h1
          onClick={() => {
            toggleSidebar();
          }}
        >
          Click me to open the cart!
        </h1> */}
        {sideBar ? (
          <SideDrawer sideBar={sideBar} toggleSidebar={toggleSidebar} />
        ) : null}
        <Switch>
          <Route exact path="/">
            <MainTea />
          </Route>
          <Route exact path="/allteas">
            <AllTeas getTeaId={getTeaId} />
          </Route>
          <Route exact path="/teaType">
            <TeaType getTeaId={getTeaId} />
          </Route>
          <Route
            exact
            path="/tea"
            render={() =>
              teaId === 0 ? <Redirect to="/teaType" /> : <Tea teaId={teaId} />
            }
          />
          {/* <Route exact path='/tea'><Tea teaId={teaId}/></Route> */}
          <Route exact path="/auth">
            <Auth
              setToken={setToken}
              sessionToken={sessionToken}
              setAdminRole={setAdminRole}
              history={history}
            />
          </Route>
          <Route
            exact
            path="/profile"
            render={() =>
              sessionToken !== undefined && admin !== true ? (
                <Profile sessionToken={sessionToken} />
              ) : (
                <Redirect to="/auth" />
              )
            }
          />
          <Route path="/inventory">
            {admin ? <TeaInventory /> : <Redirect to="/allteas" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
