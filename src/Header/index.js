import React from "react"

const Header = props => {
  return (
    <header>
      <div className="dropdown">
        <button id="menu">|||</button>
        <div className="dropdown-content">
          <a href="/">Home</a>
          <a href="/all-stories">All stories</a>
          <a href="/top-stories">Top stories</a>
          <a href="/my-stories">My Stories</a>
          <a href="/">A Random Story</a>
        </div>
      </div>
      <a href="/">
        <h1>Six Word Stories</h1>
      </a>
      <div className="add-menu">
        <a id="add-story" href="/new-story">
          +
        </a>
        <div className="add-content">
          <a href="/new-story">Write A New Story</a>
        </div>
      </div>
    </header>
  )
}

export default Header
