import React from "react"
import "./style.css"

const Form = props => {

  const submit = (e) => {
    e.preventDefault()
    fetch("http://localhost:5000/new")
      .then(resp => resp.json())
      .then(resp => console.log(resp))
  }

  return(
    <form onSubmit={submit}>
      <label htmlFor="story">Write your own six word story:</label>
      <input type="text" id="story" name="story" />
      <label htmlFor="author">Enter your name here:</label>
      <input type="text" id="author" name="author" />
      <input type="submit"/>
    </form>
  )
}

export default Form
