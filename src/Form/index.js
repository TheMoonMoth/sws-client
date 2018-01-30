import React from "react"
import "./style.css"

const Form = props => {
  return(
    <form>
      <label htmlFor="story">Write your own six word story:</label>
      <input type="text" id="story" name="story" value=""/>
      <label htmlFor="author">Enter your name here:</label>
      <input type="text" id="author" name="author" value=""/>
      <input type="submit"/>
    </form>
  )
}

export default Form
