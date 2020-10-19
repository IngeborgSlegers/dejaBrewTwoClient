import React, { useState} from 'react'
import {Navbar, NavbarBrand} from 'reactstrap';
import {Link} from 'react-router-dom'; 
import User from '../../assets/user.png';
import './Nav.css';

const Sidebar = (props) => {

    const userIcon = (props.sessionToken === undefined || props.sessionToken === '' ) ? <Link to='/auth' ><img src={User} alt='user icon' height='20vw' /></Link> : <Link to='/profile'><img src={User} alt='user icon' height='20vw' /></Link>

    return(
      <div className='main'>
        <Navbar color='light' light expand="md">
          <NavbarBrand href="/">Deja Brew</NavbarBrand>
          <br />
          <div className='icon'>
            {userIcon}
          </div>
        </Navbar>
      </div>
    )
}

export default Sidebar;