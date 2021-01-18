import React from 'react'

export const Home = () => {
  // useEffect(() => {
  //   console.log("Home Component");
  // }, [])
    return (
      <div>
        <div style = {{paddingTop: "20px", wordWrap: "normal"}}>
          <h1>{`hello `.repeat(3000)}</h1>
        </div>
      </div>
    )
}
