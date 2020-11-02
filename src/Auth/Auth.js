import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';


const Auth = (props) => {

  const [isUser, setIsUser] = useState(false);

  const changeUserStatus = () => {
    console.log(isUser)
    setIsUser(!isUser)
  }

  const authViewShow = () => {
    if(isUser) {
      return (
        <Signup sessionToken={props.sessionToken} setToken={props.setToken} toggleForm={changeUserStatus} />
      )
    } else {
      return (
        <Login sessionToken={props.sessionToken} setToken={props.setToken} toggleForm={changeUserStatus} />
      )
    }
  }

    return (
      <div>
        {authViewShow()}
      </div>
    );
}

export default Auth;
