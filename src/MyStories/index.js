import React from "react"
import ReactDOM from "react"
import StoryList from "./StoryList"

const MyStories = props => {

  var name = {name: "", id: 0}
  var stories = []

  const getStories = (e) => {
    e.preventDefault()
    let form = new FormData(e.target)
    name.name = form.get("get-name")

    props.authors.forEach(author => {
      if (author.name === name.name){
        name.id = author.id
      }
    })

    fetch("http://localhost:5000/stories/" + name.id)
      .then(response => response.json())
      .then(response => stories = response.stories)

    console.log(stories)
  }

  const listStories = (array) => {
    return array.map(storyObj => {
      return (
        <li>
          <h4>{storyObj.story}</h4>
          <small>~test author</small>
        </li>
      )
    })
  }

  return(
    <div>
      <form onSubmit={getStories}>
        <label htmlFor="get-name">Enter your name:</label>
        <input type="text" id="get-name" name="get-name" />
        <button type="submit" id="get-name">Get stories</button>
      </form>
      <div id="author">
      </div>
    </div>
  )
}

export default MyStories
