import React from "react"
import StoryList from "./StoryList"

class MyStories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stories: [],
      authorName: "",
      authorId: 0
    }
  }

  getStories = e => {
    e.preventDefault()
    this.props.authors.forEach(author => {
      if (author.name === e.target[0].value) {
        this.setState({ authorId: author.id, authorName: e.target[0].value })
      }
    })

    setTimeout(() => {
      fetch("http://localhost:5000/stories/" + this.state.authorId)
        .then(response => response.json())
        .then(response => this.setState({ stories: response.stories }))
    }, 100)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.getStories}>
          <label htmlFor="get-name">Enter your name:</label>
          <input type="text" id="get-name" name="get-name" />
          <button type="submit" id="get-name">
            Get stories
          </button>
        </form>

        <StoryList collection={this.state} deleteStory={this.props.deleteStory}/>
      </div>
    )
  }
}

export default MyStories
