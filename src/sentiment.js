import React from "react"


const Emolyzer = (props) => {
  const sentiment = require("sentiment")

  var r1 = sentiment(props.story)
  console.log(r1)
  return(
    <div>
      <p>{}</p>
    </div>
  )

}

export default Emolyzer
