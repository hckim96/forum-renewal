import React from 'react'
import { Card } from '../components/Card'
import { Header } from '../components/Header'

export const Home = () => {
    let Cards =  [...Array(40).keys()].map((d) =>
      <Card number = {d}/>
  );
    return (
        <div>
        {/* <div style = {{backgroundColor: "white"}}>
          <Header/>
        </div> */}
        <div  onClick = {() => {

        }} style = {{paddingTop: "20px", display: "flex", flexWrap: "wrap"}}>
          {Cards}
        </div>
      </div>
    )
}
