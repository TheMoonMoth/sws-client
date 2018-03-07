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

  checkAuthor = (name) => {
    return this.props.authors.find(author => author.name === name)
  }

  validate = ({story}) => {
    return story.split(' ').length === 6
  }

  createAuthor = () => {
    return fetch(APIurl + "authors", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: this.state.author
      })
    })
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp)
      return resp
    })
  }

  createStory = ({story, authorId}) => {
    return fetch(APIurl + "stories", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        story: story,
        author_id: authorId,
        rating: 0
      })
    })
    .then(resp => resp.json())
    .then(resp => ReactDOM.render(<HighWarning />, document.getElementById("form-message")))
    .then(()=>{
      setTimeout(()=>{window.location.href = "/"}, 2000)
    })
  }

  handleStory = (e) => {
    e.preventDefault()
    this.setState({story: e.target.value})
  }

  handleAuthor = (e) => {
    e.preventDefault()
    this.setState({author: e.target.value})
  }

  submit = (event) => {
    event.preventDefault()

    Promise.resolve(this.state)
      .then(this.validate)
      .then(isValid => {
        if (!isValid) {
          ReactDOM.render(<LowWarning />, document.getElementById("form-message"))
          return Promise.reject(new Error('Story must be 6 words!'))
        }
        return this.checkAuthor(this.state.author)
      })
      .then(matchedAuthor => {
        if (matchedAuthor) {
          console.log('found author', matchedAuthor)
          this.setState({authorId: matchedAuthor.id})
          return matchedAuthor
        } else {
          console.log('creating author', this.state.author);
          return this.createAuthor(this.state.author)
        }
      })
      .then(author => {
        console.log('author', author);
        return this.createStory({authorId: author.id, story: this.state.story});
      })
      .catch(err => {
        console.log('ERROR:', err);
        this.setState({error: err.message})
        if (err.message.indexOf('timeout') > -1) {
          return this.submit(event)
        }
        return 'Keep going'
      })
  }


    //
    // if (story.length < 6) {
    //   ReactDOM.render(<LowWarning />, document.getElementById("form-message"))
    //   return
    // } else if (story.length > 6) {
    //   ReactDOM.render(<HighWarning />, document.getElementById("form-message"))
    //   return
    // }



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
