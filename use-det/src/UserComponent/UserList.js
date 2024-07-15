import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserList() {
  const[users, setUsers] =useState([])
//   useEffect(()=>{
//     fetch('https://jsonplaceholder.typicode.com/users')
//     .then(response => response.json())
//     .then(data=>setUsers(data))
//   },[])  

  //Axios Api call
  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response =>setUsers(response.data))
  }, [])

  
  
  return (
    <div className='contaner mt-3'>
        <div className='row'>
            <div className='col-md-12'>
                <h4> UserDetails in List</h4>

                <ul className='list-group'>
                   {users.map(user => (
                       <li key={user.id} className='list-group-item'>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                      </li>
                    ))}
                </ul>
                
            </div>
        </div>
        
    </div>
  )
}
