import React from 'react'
import './Card.css'
import Flippy, { FrontSide, BackSide } from 'react-flippy';

export const Card = ({number}) => {
    let flippy; 
    return (
        // <div className = "card">
        //     <b>card {number}</b>
        // </div>
        <div className = "card">
            <Flippy
    flipOnHover={false} // default false
    flipOnClick={true} // default false
    flipDirection="horizontal" // horizontal or vertical
    ref={(r) => flippy = r} // to use toggle method like this.flippy.toggle()
    // if you pass isFlipped prop component will be controlled component.
    // and other props, which will go to div

    // style = {{width: "200px", height: "200px"}}
    className = "flippy"
  >
    <FrontSide
        className = "card-front"
        >
      RICK
    </FrontSide>
    <BackSide
        className = "card-back"
      >
      ROCKS
    </BackSide>
  </Flippy>
        </div>
    )
}

