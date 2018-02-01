import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import "./App.css"
import Header from "./Header"
import Card from "./Story"
import Philosophy from "./Philosophy"
import Form from "./Form"
import Footer from "./Footer"
import AllStories from "./AllStories"
import MyStories from "./MyStories"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stories: [],
      authors: []
    }
    this.sayYes = this.sayYes.bind(this)
    this.sayNo = this.sayNo.bind(this)
    this.deleteStory = this.deleteStory.bind(this)
  }

  deleteStory = e => {
    e.preventDefault()
    console.log(
      "this will delete the story: " +
        e.target.parentNode.firstChild.firstChild.textContent
    )

    var text = e.target.parentNode.firstChild.firstChild.textContent
    var id
    this.state.stories.forEach(story => {
      if (story.story === text) {
        id = story.id
      }
    })

    fetch("http://localhost:5000/delete/" + id, {
      method: "DELETE"
    })
      .then(response => response.json())
      .catch(error => console.error)
      .then(response => console.log(response.message))
      .then((window.location.href = "/all-stories"))
  }

  sayYes = e => {
    e.preventDefault()
    var text = e.target.parentNode.parentNode.firstChild.firstChild.textContent
    var id
    this.state.stories.forEach(story => {
      if (story.story === text) {
        id = story.id
      }
    })

    fetch("http://localhost:5000/voteYes/" + id, {
      method: "PUT",
      body: JSON.stringify({
        story: text
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => response.json())
      .catch(error => console.error)
      .then(response => console.log(response.message))
  }

  sayNo = e => {
    e.preventDefault()
    var text = e.target.parentNode.parentNode.firstChild.firstChild.textContent
    var id
    this.state.stories.forEach(story => {
      if (story.story === text) {
        id = story.id
      }
    })

    fetch("http://localhost:5000/voteNo/" + id, {
      method: "PUT",
      body: JSON.stringify({
        story: text
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => response.json())
      .catch(error => console.error)
      .then(response => console.log(response.message))
  }

  componentDidMount() {
    fetch("http://localhost:5000/stories")
      .then(response => response.json())
      .then(response => this.setState({ stories: response.stories }))

    fetch("http://localhost:5000/authors")
      .then(response => response.json())
      .then(response => this.setState({ authors: response.authors }))
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={Header} />
          <Route
            exact
            path="/"
            render={() => (
              <Card
                stories={this.state.stories}
                authors={this.state.authors}
                sayYes={this.sayYes}
                sayNo={this.sayNo}
              />
            )}
          />
          <Route exact path="/" render={() => <Philosophy />} />
          <Route
            exact
            path="/all-stories"
            render={() => (
              <AllStories
                stories={this.state.stories}
                authors={this.state.authors}
                sayYes={this.sayYes}
                sayNo={this.sayNo}
                deleteStory={this.deleteStory}
              />
            )}
          />
          <Route
            path="/new-story"
            render={() => (
              <Form stories={this.state.stories} authors={this.state.authors} />
            )}
          />
          <Route
            path="/my-stories"
            render={() => {
              return (
                <MyStories
                  stories={this.state.stories}
                  authors={this.state.authors}
                  sayYes={this.sayYes}
                  sayNo={this.sayNo}
                />
              )
            }}
          />
          <Route path="/" component={Footer} />
        </div>
      </Router>
    )
  }
}

export default App
