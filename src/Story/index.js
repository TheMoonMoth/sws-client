import React from "react"
import Emolyzer from "../sentiment.js"
import "./Card.css"

const Card = props => {
  let story = props.stories[Math.floor(Math.random() * props.stories.length)]

  if (props.stories.length < 1) {
    return <h3>No Data, yet</h3>
  }

  if (props.authors.length < 1) {
    return <h3>No Data, yet</h3>
  }

  for (var i = 0; i < props.authors.length; i++) {
    if (story.author_id === props.authors[i].id) {
      var author = props.authors[i].name
    }
  }

  return (
    <div className="content-window">
      <div id="story-card">
        <h2>{story.story}</h2>
        <small>{"~" + author}</small>
      </div>
      <section className="voters">
        <button
          type="button"
          onClick={function(e) {
            props.sayYes
            window.location.href = "/"
          }}
        >
          Yes!
        </button>
        <button
          type="button"
          onClick={function(e) {
            props.sayNo
            window.location.href = "/"
          }}
        >
          No.
        </button>
      </section>
      <div>
        <Emolyzer story={story.story} />
      </div>
    </div>
  )
}

export default Card
