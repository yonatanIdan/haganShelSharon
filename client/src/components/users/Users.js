import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../services/Api";
import './style/users.css';

import { FiTrash2 } from "react-icons/fi";
import { GiFrozenOrb } from "react-icons/gi";
import { VscWorkspaceTrusted } from "react-icons/vsc";

import Table from 'react-bootstrap/Table'

function Users() {
  const [users, setUsers] = useState([]);
  let place = 0;

  const frozenChanger = async (user) => {
    user.frozen = !user.frozen;
    await axios.post(`${URL}users/updateusers`, user);
  };
  
  const deleteUser = async (user) => {
    await axios.post(`${URL}users/deleteusers`, user);
  };
  useEffect(async () => {
    const users = await axios.get(`${URL}users/users`);
    const usersData = await users.data;
    setUsers([...usersData]);
  }, [frozenChanger, deleteUser]);

  return (
    <div style={{ direction: "ltr" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Role</th>
            <th>Phone</th>
            <th>kindergarten</th>
            <th>Password</th>
            <th>Frozen</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            place++;
            const styleRow = {
                background: '#90ff90',
            };
            if (user.frozen) styleRow.background = 'rgb(103 203 255)'
            return (
              <tr key={user._id} className="rowUser" style={styleRow} onClick={()=>console.log(user)}>
                <td>{place}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.phone}</td>
                {user.kindergarten ? <td>{user.kindergarten.name+ " - "+ user.kindergarten.city}</td>:<td><b>Staff</b></td>}
                <td>{user.password}</td>
                <td onClick={()=>frozenChanger(user)}>{!user.frozen?<VscWorkspaceTrusted size={30}/>:<GiFrozenOrb size={30}/>}</td>
                <td onClick={()=>deleteUser(user)}><FiTrash2 size={25} /></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Users;
