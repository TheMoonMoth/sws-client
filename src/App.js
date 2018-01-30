import React, { Component } from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"
import "./App.css"
import Header from "./Header"
import Card from "./Story"
import Philosophy from "./Philosophy"
import Form from "./Form"
import Footer from "./Footer"


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
      <div className="App">
        <Header />
        <Card stories={this.state.stories} authors={this.state.authors} />
        <Philosophy />
        <Form />
        <Footer />
      </div>
    )
  }
}

export default App
