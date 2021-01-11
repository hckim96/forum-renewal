import React from 'react'
import { Card } from '../components/Card'
import Flippy, { FrontSide, BackSide } from 'react-flippy';

export const Home = () => {
  //   let Cards =  [...Array(40).keys()].map((d) =>
  //     <Card number = {d}/>
  // );
    let Cards = [...Array(2).keys()].map((d) => {
      return (
        <Card/>
      )
    })
    return (
      <div>
        <div style = {{paddingTop: "20px", display: "flex", flexWrap: "wrap"}}>
          {Cards}
        </div>
      </div>
    )
}
