import React from "react"
import ReactDOM from "react-dom"
import LowWarning from "./lowWarning"
import HighWarning from "./highWarning"
import "./style.css"

const APIurl = "https://sixwordstories-server.herokuapp.com/"

class Form extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      story: "",
      author: "",
      authorId: 0
    }
  }

  submit = (e) => {
    e.preventDefault()
    let story = this.state.story.split(" ")

    if (story.length < 6) {
      ReactDOM.render(<LowWarning />, document.getElementById("form-message"))
      return
    } else if (story.length > 6) {
      ReactDOM.render(<HighWarning />, document.getElementById("form-message"))
      return
    }

    this.props.authors.forEach(author => {
      if (author.name === this.state.author) {
        this.setState({authorId: author.id})
      }
    })

    if (this.state.authorId === 0) {
      fetch(APIurl + "authors", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: this.state.author
        })
      })
        .then(resp => resp.json())
        .then(resp => console.log(resp))
        .then((this.state.authorId = this.props.authors.length))
    }

    var sender = {
      story: this.state.story,
      author_id: this.state.authorId,
      rating: 0
    }

    fetch(APIurl + "stories", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(sender)
    })
      .then(resp => resp.json())
      .then(resp => console.log(resp))
      .then(
        setTimeout(()=>{window.location.href = "/"}, 1000)
      )
  }

  handleStory = (e) => {
    e.preventDefault()
    this.setState({story: e.target.value})
  }

  handleAuthor = (e) => {
    e.preventDefault()
    this.setState({author: e.target.value})
  }

  render(){
    return (
      <form onSubmit={(e) => this.submit(e)} id="story-form-checker">
        <label htmlFor="story">Write your own six word story:</label>
        <input type="text" id="story" value={this.state.story} onChange={(e)=>this.handleStory(e)}/>
        <label htmlFor="author">Enter your name here:</label>
        <input type="text" id="author" value={this.state.author} onChange={(e)=>this.handleAuthor(e)} />
        <button id="submit" type="submit">
          Submit
        </button>
        <div id="form-message" />
      </form>
    )
  }
}

export default Form
