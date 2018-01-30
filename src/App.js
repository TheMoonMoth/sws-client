import React, { Component } from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"
import "./App.css"
import Header from "./Header"
import Card from "./Story"
import Philosophy from "./Philosophy"
import Form from "./Form"
import Footer from "./Footer"
import AllStories from "./AllStories"


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
        <Route exact path="/" render={() => {return (<Card stories={this.state.stories} authors={this.state.authors} />)}} />
        <Route exact path="/" render={() => {return (<Philosophy />)}} />
        <Route exact path="/all-stories" render={() => {return (<AllStories stories={this.state.stories} authors={this.state.authors} />)}} />
        <Route path="/new-story" render={() => {return <Form />}} />
        <Route path="/" component={Footer} />
      </div>
      </Router>
    )
  }
}

export default App
