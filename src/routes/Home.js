import React, { useEffect } from 'react'
import {db} from "../firebase";

export const Home = () => {
  useEffect(() => {
    console.log("Home Component");

    // /users/1 : {username ... }
    // /users , users : 
    // db.ref('users/' + "1").set({
    //   username: "name",
    //   email: "email",
    //   profile_picture : "imageUrl"
    // });

    // root
    // db.ref('/').set({ 
    //   username: "name",
    //   email: "email",
    //   profile_picture : "imageUrl"
    // });
    // const refTest = db.ref("/hi/hello")
    // refTest.
  }, [])
    return (
      <div>
        <div style = {{paddingTop: "20px", wordWrap: "normal"}}>
          <h1>{`hello `.repeat(3000)}</h1>
        </div>
      </div>
    )
}
