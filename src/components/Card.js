import React from 'react'
import './Card.css'
import Flippy, { FrontSide, BackSide } from 'react-flippy';
// import back from "./back_test3.png";
export const Card = ({ id, content, flipped, handleClick, matched }) => {

  return (
    <div className="card">
      <Flippy
        isFlipped={flipped}
        flipOnHover={false} // default false
        flipDirection="horizontal" // horizontal or vertical
        style={{ width: window.innerWidth / 2 / 4 *.8, height: window.innerWidth / 2 / 4 * .8 * 1.4 }}
      >
        <FrontSide
          animationDuration = {450}
          className="card-front"
        >
          <img className="card-back-image" src={process.env.PUBLIC_URL + '/images/' + content} alt="front" />
        </FrontSide>
        <BackSide
          animationDuration = {450}
          onClick={() => { handleClick(id) }}
          className="card-back"
        >
          <img className="card-back-image" src={process.env.PUBLIC_URL + '/images/back_test3.png'} alt="back" />
        </BackSide>
      </Flippy>
    </div>
  )
}

