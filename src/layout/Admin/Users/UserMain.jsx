import React, {useState, useEffect} from 'react';
import User from './User';

const UserMain = (props) => {

  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    let url = `http://localhost:4000/user/admin/allusers`;
    let getUsers = await fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      }),
    });
    let response = await getUsers.json();
    console.log(response);
    setUsers(response.users)
  };

  useEffect(() => {
    getAllUsers();
  }, [])

  return (
    <div>
      {users.length > 0 ? users.map(user => <User user={user} />) : null}
    </div>
  )
}

export default UserMain
