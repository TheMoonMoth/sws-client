import React, { Component } from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"
import "./App.css"
import Header from "./Header"
import Card from "./Story"
import Philosophy from "./Philosophy"
import Form from "./Form"
import Footer from "./Footer"
import AllStories from "./AllStories"
import MyStories from "./MyStories"


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      stories: [],
      authors: []
    }
  }

  componentDidMount(){
    fetch("http://localhost:5000/stories")
    .then(response => response.json())
    .then(response => this.setState({stories: response.stories}))

    fetch("http://localhost:5000/authors")
    .then(response => response.json())
    .then(response => this.setState({authors: response.authors}))
  }

  render() {
    return (
      <Router>
      <div className="App">
        <Route path="/" component={Header} />
        <Route exact path="/" render={() => <Card stories={this.state.stories} authors={this.state.authors} />} />
        <Route exact path="/" render={() => <Philosophy />} />
        <Route exact path="/all-stories" render={() => <AllStories stories={this.state.stories} authors={this.state.authors} />} />
        <Route path="/new-story" render={() => <Form stories={this.state.stories} authors={this.state.authors} />} />
        <Route path="/my-stories" render={() => {return <MyStories stories={this.state.stories} authors={this.state.authors} />}} />
        <Route path="/" component={Footer} />
      </div>
      </Router>
    )
  }
}

export default App
