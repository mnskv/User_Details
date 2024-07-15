import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Aboutus from './Aboutus/Aboutus';
import './App.css';
import Contactus from './ContactUs/Contactus';
import Employee from './EmployeeComponent/Employee';
import UserList from './UserComponent/UserList';
import { ErrorBoundary } from 'react-error-boundary';
import React from 'react';
import ErrorFallBack from './ErrorCallBack/ErrorFallBack';

const Userlist = React.lazy(()=> import('./UserComponent/UserList'));
const employee = React.lazy(()=> import('./EmployeeComponent/Employee'))
const aboutus = React.lazy(()=> import('./Aboutus/Aboutus'))
const contactus = React.lazy(()=> import('./ContactUs/Contactus'))

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <ErrorBoundary
      FallbackComponent={ErrorFallBack}
      onReset={() => window.location.reload()}>
        <Routes>
        <Route path='/' element={<Aboutus/>}/>
        <Route path='/aboutus' element={<Contactus/>}/>
        <Route path='/employee' element={<Employee/>}/>
        <Route path='/userlist' element={<UserList/>}/>
        <Route path='/employee/:id' element={<Employee/>}/>
      </Routes>

      </ErrorBoundary>
     
      
      </BrowserRouter>
    </div>
  );
}

export default App;
