import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slide = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className='slider'>
      <Slider {...settings}>
        <div>
          <img src='assets/images/slider1.jpg' alt='img' />
        </div>
        <div>
          <img src='assets/images/slider2.jpg' alt='img' />
        </div>
      </Slider>
    </div>
  )
}

export default Slide
