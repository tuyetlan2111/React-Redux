import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  let navigate = useNavigate();
  const [show, setShow] = useState(false);

  let userName = localStorage.getItem('userName');
  let { cart } = useSelector(state => state.carts);

  const getTotalItem = () => {
    let totalQuantity = 0;
    cart?.forEach(item => {
      totalQuantity += item.qty;
    })
    return totalQuantity;
  }

  const logout = () => {
    localStorage.removeItem('password');
    localStorage.removeItem('userName');
    navigate("/login", { replace: true });
  }

  const handleClickNav = () => {
    setShow(s => !s);
  }

  return (
    <header className='header'>
      <div className='header_wraper'>
        <h1 className='logo'>
          <a href='/'>
            <img src='/assets/images/logo.webp' alt='walmartLogo' />
          </a>
        </h1>
        <div className="nav-menu">
          <div className="mainContainer">
            <a href="#" className={'menuBtn ' + (show === true ? 'act' : '')} onClick={handleClickNav} >
              <span className="lines"></span>
            </a>
            <nav className={"mainMenu " + (show === true ? 'act' : '')}>
              <ul>
                <li><a href="/">Trang chủ</a></li>
                <li><a href="/product">Sản phẩm</a></li>
                <li><a href="#">Tin tức</a></li>
                <li><a href="#">Liên hệ</a></li>
              </ul>
            </nav>
          </div>

        </div>
        <div className='header_item flex'>
          <a className='header_cart' href='/cart'>
            <p>
              <i className="fa fa-shopping-cart"></i>
              <span className='cart_number'>{getTotalItem()}</span>
            </p>
          </a>
          <div className='header_login'>

            {
              userName ? <><i className="fa fa-user-circle"></i><a href='/#' className='userName'>{userName}</a> </>
                :
                <a href='/login'>Login</a>
            }
            {
              userName ? <a onClick={logout}>Logout</a> : <a href='/signup'>Sign Up</a>
            }

          </div>
        </div>
      </div>
    </header>

  )
}

export default Header