import React, { useState } from 'react';
import Slider from 'react-slick';
import { toSeoUrl } from '../../utils/seoLink';
import { Rating } from './Rating/Rating';

const Section = ({ title, data }) => {

  const settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
  };

  const fillColorArray = [
    "#f17a45",
    "#f17a45",
    "#f19745",
    "#f19745",
    "#f1a545",
    "#f1a545",
    "#f1b345",
    "#f1b345",
    "#f1d045",
    "#f1d045"
  ];

  const [rating, setRating] = useState(0);
  const handleRating = (rate) => setRating(rate);

  return (
    <div className='section'>
      <div className='flex title'>
        <h3>{title}</h3>
        <a className='show-all'>Shop All</a>
      </div>
      <div className='pet'>
        <Slider {...settings}>
          {
            data && data.map(d => (
              <div className='pet_item' key={d.id}>
                <a href={'/' + d.id + '_' + toSeoUrl(d.name)}>
                  <div className='pet_item_top'>
                    <img src={d.image} alt='pet' />
                    <button className='btnAdd'>+ Add</button>
                  </div>
                  <div className='pet_item_center'>
                    <p className='pet_price'>${d.price}</p>
                    <h4>{d.name}</h4>
                    {
                      d.star && (<Rating
                        onClick={handleRating}
                        ratingValue={rating}
                        size={20}
                        transition
                        allowHalfIcon
                        showTooltip
                        fillColorArray={fillColorArray}
                      />)
                    }
                    <span className='pet_reviews'>{d.reviews}</span>
                  </div>
                  <div className='pet_item_bottom'>
                    <span>{d.date}</span>
                  </div>
                </a>
              </div>
            ))
          }
        </Slider>
      </div>
    </div>
  )
}

export default Section
