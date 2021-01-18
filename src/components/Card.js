import React from 'react'
import './Card.css'
import Flippy, { FrontSide, BackSide } from 'react-flippy';
// import back from "./back_test3.png";
export const Card = ({ id, content, flipped, handleClick, matched, width }) => {

  return (
    <div className="card"
    style={{ width: window.innerWidth * .75 / width *.9, 
      height: window.innerHeight * .75 / (width / 2 + 1) * .9 * 1.4, 
      margin: window.innerWidth * .75 / width * .025}}
    >
      <Flippy
        isFlipped={flipped}
        flipOnHover={false} // default false
        flipDirection="horizontal" // horizontal or vertical
        style={{ width: "100%", 
          height: "100%", 
          }}
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

