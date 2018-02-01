import React from "react"
import "./Card.css"

//props.collection = {stories: [], authorName: "", authorId: 0}


const StoryList = props => {
  return(
    props.collection.stories.map(story => {
      return(
        <div key={story.story} className="content-window">
          <div id="author-story-card">
            <h2>{story.story}</h2>
            <small>{"~" + props.collection.authorName}</small>
          </div>
        </div>
      )
    })
  )
}

export default StoryList
