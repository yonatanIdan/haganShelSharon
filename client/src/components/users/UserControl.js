import React from 'react';
import AddUser from './AddUser';
import Users from './Users';
import './style/userControl.css';

function UserControl() {
  return <div className="container">
    <AddUser/>
    <Users/>
  </div>;
}

export default UserControl;
