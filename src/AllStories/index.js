import React from "react"

class AllStories extends React.Component {

  render(){

    return (
      this.props.stories.sort((a, b) => {
        return (b.rating) - (a.rating);
      }).map(story => {
        for (var i = 0; i < this.props.authors.length; i++) {
          if (story.author_id === this.props.authors[i].id) {
            var author = this.props.authors[i].name
          }
        }
      return (
        <div key={story.story} className="content-window">
          <div id="story-card">
            <h2>{story.story}</h2>
            <small>{"~" + author}</small>
          </div>
          <section className="voters">
            <button type="button" onClick={this.props.sayYes}>
              Yes!
            </button>
            <p>{story.rating}</p>
            <button type="button" onClick={this.props.sayNo}>
              No.
            </button>
          </section>
        </div>
      )
    }))
  }
}


export default AllStories
