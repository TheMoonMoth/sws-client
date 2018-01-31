import React from "react"


//stories = [storyObj, storyObj]
//author = ""

const StoryList = props => {
  return(
    props.stories.map(storyObj => {
      return(
        <div id="story-card">
          <h2>Test card!</h2>
          <small>Test author! </small>
        </div>
      )
    })
  )
}

export default StoryList
