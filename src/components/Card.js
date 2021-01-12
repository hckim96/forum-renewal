import React from 'react'
import './Card.css'
import Flippy, { FrontSide, BackSide } from 'react-flippy';

export const Card = ({number, flipped, handleClick, matched}) => {

  return (
    <div className="card">
      <Flippy
        isFlipped={flipped}
        flipOnHover={false} // default false
        flipDirection="horizontal" // horizontal or vertical
        style={{ width: "200px", height: "200px" }}
      >
        <FrontSide
          className="card-front"
          >
          앞{number}
    </FrontSide>
        <BackSide
          // onClick = {() => {handleClick(id)}}
          className="card-back"
        >
          뒤
        </BackSide>
      </Flippy>
    </div>
  )
}

