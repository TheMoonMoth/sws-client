import React from "react"

const AllStories = props => {
  if (props.stories.length < 1) {
    return <h3>No Data, yet</h3>
  }

  if (props.authors.length < 1) {
    return <h3>No Data, yet</h3>
  }

  const sayYes = (e) => {
    e.preventDefault()
    console.log("yes click")
  }

  const sayNo = (e) => {
    e.preventDefault()
    console.log("no click")
  }

  return (
    props.stories.map(story => {
      for (var i = 0; i < props.authors.length; i++) {
        if (story.author_id === props.authors[i].id) {
          var author = props.authors[i].name
        }
      }
      return(
    <div className="content-window">
    <div id="story-card">
      <h2>{story.story}</h2>
      <small>{"~" + author}</small>
    </div>
    <section className="voters">
      <button type="button" onClick={sayYes}>Yes!</button>
      <button type="button" onClick={sayNo}>No.</button>
    </section>
    </div>
  )}))
}


export default AllStories
