import React from "react"
import ReactDOM from "react-dom"
import LowWarning from "./lowWarning"
import HighWarning from "./highWarning"
import "./style.css"

const Form = props => {
  const submit = e => {
    e.preventDefault()
    let form = new FormData(e.target)
    let story = form.get("story").split(" ")

    if (story.length < 6) {
      ReactDOM.render(<LowWarning />, document.getElementById("form-message"))
      return console.log("Story too short")
    } else if (story.length > 6) {
      ReactDOM.render(<HighWarning />, document.getElementById("form-message"))
      return console.log("Story too long")
    }

    var authorId = 0

    props.authors.forEach(author => {
      if (author.name === form.get("author")) {
        authorId = author.id
      }
    })

    if (authorId === 0) {
      fetch("http://localhost:5000/authors", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: form.get("author")
        })
      })
        .then(resp => resp.json())
        .then(resp => console.log(resp))
        .then((authorId = props.authors.length))
    }

    var sender = {
      story: form.get("story"),
      author_id: authorId,
      rating: 0
    }

    fetch("http://localhost:5000/stories", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(sender)
    })
      .then(resp => resp.json())
      .then(resp => console.log(resp))
      .then((window.location.href = "/"))
  }

  return (
    <form onSubmit={submit} id="story-form-checker">
      <label htmlFor="story">Write your own six word story:</label>
      <input type="text" id="story" name="story" />
      <label htmlFor="author">Enter your name here:</label>
      <input type="text" id="author" name="author" />
      <button id="submit" type="submit">
        Submit
      </button>
      <div id="form-message" />
    </form>
  )
}

export default Form
