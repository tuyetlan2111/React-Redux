import React from 'react';

const Footer = () => {
  return (
    <React.Fragment>
      <div className='footer'>
        <div className='container'>
          <ul className='footer_nav'>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/product">Sản phẩm</a></li>
            <li><a href="#">Tin tức</a></li>
            <li><a href="#">Liên hệ</a></li>
          </ul>
          <div className='footer_icon'>
            <i className="fa fa-facebook-square"></i>
            <i className="fa fa-instagram"></i>
            <i className="fa fa-skype"></i>
            <i className="fa fa-twitter-square"></i>
            <i className="fa fa-youtube-square"></i>
          </div>

        </div>
      </div>
    </React.Fragment>

  )
}




export default Footer