import React, { useState } from "react";
import AlertDialog from "./AlertDialog";
import Login from "./Login";
import Signup from "./Signup";

const Auth = (props) => {
  const [isUser, setIsUser] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const changeUserStatus = () => {
    console.log(isUser);
    setIsUser(!isUser);
  };

  const alert = (message) => {
    setOpen(true);
    setError(true);
    setErrorMessage(message);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const authViewShow = () => {
    if (isUser) {
      return (
        <Signup
          sessionToken={props.sessionToken}
          setToken={props.setToken}
          toggleForm={changeUserStatus}
          alert={alert}
        />
      );
    } else {
      return (
        <Login
          setAdminRole={props.setAdminRole}
          sessionToken={props.sessionToken}
          setToken={props.setToken}
          toggleForm={changeUserStatus}
          alert={alert}
        />
      );
    }
  };

  return (
    <div>
      {error ? (
        <AlertDialog
          handleClose={handleClose}
          open={open}
          errorMessage={errorMessage}
        />
      ) : null}
      {authViewShow()}
    </div>
  );
};

export default Auth;
