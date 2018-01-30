import React from "react"
import "./style.css"

const Form = props => {

  const submit = (e) => {
    e.preventDefault()
    let form = new FormData(e.target)
    let sender = {
      story: form.get("story"),
      author: form.get("author")
    }

    fetch("http://localhost:5000/new", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(form)
    })
      .then(resp => resp.json())
      .then(resp => console.log(resp))
  }

  return(
    <form onSubmit={submit}>
      <label htmlFor="story">Write your own six word story:</label>
      <input type="text" id="story" name="story" />
      <label htmlFor="author">Enter your name here:</label>
      <input type="text" id="author" name="author" />
      <button id="submit" type="submit">Submit</button>
    </form>
  )
}

export default Form
