import { Navigate, Outlet } from 'react-router-dom';

import React from 'react';
import Header from './component/walmart/Header';
import Footer from './component/walmart/Footer';

export { PrivateRoute };

function PrivateRoute() {

  let userName = localStorage.getItem('userName') || '';

  return (
    userName ?
      (
        <>
          <Header />
          <Outlet />
          <Footer/>
        </>

      )

      : <Navigate to='/login' />
  );
}
