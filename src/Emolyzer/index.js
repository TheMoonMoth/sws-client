import React from "react"
import "./style.css"
const sentiment = require("sentiment")


const Emolyzer = (props) => {

  var r1 = sentiment(props.story)
  let scoredEmotion
  let scoredDescription

  if (r1.score > 6) {
    scoredEmotion = props.emotions[12].emotion.toUpperCase()
    scoredDescription = props.emotions[12].description
  } else if (r1.score < -6) {
    scoredEmotion = props.emotions[0].emotion
    scoredDescription = props.emotions[0].description
  }

  props.emotions.forEach(emotion => {
    if (emotion.score === r1.score){
      scoredEmotion = emotion.emotion.toUpperCase()
      scoredDescription = emotion.description
    }
  })

  console.log("Text analysis provided by sentiment.js")
  return(
    <div id="emolyzer">
      <h2>{scoredEmotion}</h2>
      <p>{scoredDescription}</p>
    </div>
  )

}

export default Emolyzer
