import React from 'react';
import StarRatings from 'react-star-ratings';
import './style.css'
export const Header = (props) => {
  return (
    <div>
      <h1 className='heading'>{props?.title}</h1>
      <p className='category-title'>{props?.category}</p>
      <StarRatings
        rating={props?.rating}
        starRatedColor="black"
        numberOfStars={5}
        name='rating'
      />
    </div>
  )
}