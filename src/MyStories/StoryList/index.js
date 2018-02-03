import React from "react"
import "./List.css"

const StoryList = props => {
  return props.collection.stories.map(story => {
    return (
      <div key={story.story} className="content-winder">
        <div id="author-story-card">
          <h2>{story.story}</h2>
          <small>{"~" + props.collection.authorName}</small>
        </div>
        <p>{story.rating}</p>
        <button id="deleter">Delete Story</button>
      </div>
    )
  })
}

export default StoryList
