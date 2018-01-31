import React from "react"

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
      .then(response => console.log(stories))

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
