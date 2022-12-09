import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './main.scss';

import Cart from './component/walmart/cart/Cart';
import CategoryList from './component/walmart/CategoryList';
import Footer from './component/walmart/Footer';
import Header from './component/walmart/Header';
import Login from './component/walmart/Login';
import ProductDetail from './component/walmart/ProductDetail';
import SignUp from './component/walmart/SignUp';
import { PrivateRoute } from './PrivateRoute ';

function App() {

  var myStyle = {
    fontSize: 14,
    color: '#000'
  }

  return (
    <div className="App" style={myStyle}>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes  >
          <Route exact path='/' element={<PrivateRoute />}>
            <Route exact path='/' element={<CategoryList />} />
            <Route exact path='/product/:id' element={<ProductDetail />} />
            <Route exact path='/product' element={<CategoryList />} />
            <Route exact path='/cart' element={<Cart />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route exact path='/signup' element={<SignUp />} />
        </Routes >
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
