import React from 'react'

function Footer() {

  const footer ={
      "color":"#05815ae6",
      "fontWeight":"bolder",
      "backgroundColor": "white",
      "position": "relative",
      "left": "0",
      "bottom": "0",
      "right": "0",
      "height" : "2.5rem",
      "display":"flex",
     " alignItems": "center",
      "justifyContent": "center",   
  }

  return (
    <>
    <hr/>
      <div style={footer}>
            Copyright 2023 - eShopping | Privacy Policy | Terms
        </div> 
        </>
  )
}

export default Footer