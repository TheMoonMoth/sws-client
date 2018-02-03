import React from "react"
import Emolyzer from "../Emolyzer"
import "./Card.css"

const Card = props => {
  let story = props.stories[Math.floor(Math.random() * props.stories.length)]

  if (props.stories.length < 1) {
    return <h3>No Stories, yet</h3>
  }

  if (props.authors.length < 1) {
    return <h3>No Authors, yet</h3>
  }

  if (props.emotions.length < 1) {
    return <h3>No Emotions, yet</h3>
  }


  for (var i = 0; i < props.authors.length; i++) {
    if (story.author_id === props.authors[i].id) {
      var author = props.authors[i].name
    }
  }

  return (
    <div>
      <div className="content-window">
        <div id="story-card">
          <h2>{story.story}</h2>
          <small>{"~" + author}</small>
        </div>
        <section className="voters">
          <button
            type="button"
            onClick={props.sayYes}
          >
            Yes!
          </button>
          <p>{story.rating}</p>
          <button
            type="button"
            onClick={props.sayNo}
          >
            No.
          </button>
        </section>
        <Emolyzer story={story.story} emotions={props.emotions}/>
      </div>
    </div>
  )
}

export default Card
