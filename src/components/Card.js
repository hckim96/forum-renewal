import React from 'react'
import './Card.css'
import Flippy, { FrontSide, BackSide } from 'react-flippy';

export const Card = ({id, content, flipped, handleClick, matched}) => {

  return (
    <div className="card">
      <Flippy
        isFlipped={flipped}
        flipOnHover={false} // default false
        flipDirection="horizontal" // horizontal or vertical
        style={{ width: "200px", height: "300px" }}
      >
        <FrontSide
          className="card-front"
          >
          앞{content}
    </FrontSide>
        <BackSide
          onClick = {() => {handleClick(id)}}
          className="card-back"
        >
          뒤
        </BackSide>
      </Flippy>
    </div>
  )
}

