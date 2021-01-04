import React from 'react'
import { Card } from '../components/Card'

export const Home = () => {
    let Cards =  [...Array(40).keys()].map((d) =>
      <Card number = {d}/>
  );
    return (
      <div>
        <div style = {{paddingTop: "20px", display: "flex", flexWrap: "wrap"}}>
          {Cards}
        </div>
      </div>
    )
}
