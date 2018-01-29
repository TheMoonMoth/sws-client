import React from "react"

const Card = props => {
  let story = props.stories[Math.floor(Math.random() * 5)]

  if (props.stories.length < 1) {
    return <h3>No Data, yet</h3>
  }

  if (props.authors.length < 1) {
    return <h3>No Data, yet</h3>
  }

  for (var i = 0; i < props.stories.length; i++) {
    if (story.id === props.authors[i].id) {
      var author = props.authors[i].name
    }
  }

  return (
    <div id="story-card">
      <h2>{story.story}</h2>
      <small>{"~" + author}</small>
    </div>
  )
}

export default Card
