import React from "react"
import "./style.css"

const Philosophy = props => {
  return(
    <div id="philosophy">
      <h2>ABOUT</h2>
      <p>This app allows users to read and write six word stories. Each story gets processed by the sentiment.js algorithm
      and then assigned emotional value, displayed below the story. Users can then vote on stories and maybe find the next
      Ernest Hemingway!</p>
      <p>Six word novels began under heavy criticism. How can a novel be written in only six words?
      While the debate rages on, we need no convincing. Six word stories can be as powerful as a thousand page
      novel. This power comes from the reader&#39;s imagination, the most powerful thing in the world. </p>
    </div>
  )
}

export default Philosophy
