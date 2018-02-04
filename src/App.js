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

const APIurl = "https://sixwordstories-server.herokuapp.com/"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stories: [],
      authors: [],
      emotions: []
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

    fetch(APIurl + "delete/" + id, {
      method: "DELETE"
    })
      .then(response => response.json())
      .catch(error => console.error)
  }

  sayYes = e => {
    e.preventDefault()
    var score = 1 + parseInt(e.target.parentNode.childNodes[1].textContent, 10)
    e.target.parentNode.childNodes[1].textContent = score
    var text = e.target.parentNode.parentNode.firstChild.firstChild.textContent
    var id
    this.state.stories.forEach(story => {
      if (story.story === text) {
        id = story.id
      }
    })
    e.target.className = "hidden"
    e.target.parentNode.childNodes[2].className = "hidden"

    fetch(APIurl + "voteYes/" + id, {
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
  }

  sayNo = e => {
    e.preventDefault()
    var score = parseInt(e.target.parentNode.childNodes[1].textContent, 10) - 1
    e.target.parentNode.childNodes[1].textContent = score
    var text = e.target.parentNode.parentNode.firstChild.firstChild.textContent
    var id
    this.state.stories.forEach(story => {
      if (story.story === text) {
        id = story.id
      }
    })
    e.target.className = "hidden"
    e.target.parentNode.childNodes[0].className = "hidden"

    fetch(APIurl + "voteNo/" + id, {
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
  }

  componentDidMount() {
    fetch(APIurl + "stories")
      .then(response => response.json())
      .then(response => this.setState({ stories: response.stories }))

    fetch(APIurl + "authors")
      .then(response => response.json())
      .then(response => this.setState({ authors: response.authors }))

    fetch(APIurl + "emotions")
      .then(response => response.json())
      .then(response => this.setState({ emotions: response.emotions }))
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
                emotions={this.state.emotions}
                sayYes={this.sayYes}
                sayNo={this.sayNo}
              />
            )}
          />
          <Route
            exact
            path="/all-stories"
            render={() => (
              <AllStories
                stories={this.state.stories}
                authors={this.state.authors}
                emotions={this.state.emotions}
                sayYes={this.sayYes}
                sayNo={this.sayNo}
                deleteStory={this.deleteStory}
              />
            )}
          />
          <Route
            exact
            path="/new-story"
            render={() => (
              <Form
              stories={this.state.stories}
              authors={this.state.authors}
              emotions={this.state.emotions}
              deleteStory={this.deleteStory}
               />
            )}
          />
          <Route
            exact
            path="/my-stories"
            render={() => {
              return (
                <MyStories
                  stories={this.state.stories}
                  authors={this.state.authors}
                  sayYes={this.sayYes}
                  sayNo={this.sayNo}
                  deleteStory={this.deleteStory}
                />
              )
            }}
          />

          <Route path="/" render={() => <Philosophy />} />
          <Route path="/" component={Footer} />
        </div>
      </Router>
    )
  }
}

export default App
