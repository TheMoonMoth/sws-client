import React from "react"

const Header = props => {


  return (
    <header>
      <div className="dropdown">
        <button id="menu">|||</button>
        <div className="dropdown-content">
          <a href="#">My Stories</a>
          <a href="#">All stories</a>
        </div>
      </div>
      <h1>Six Word Stories</h1>
      <button id="add-story">+</button>
    </header>
  )
}

export default Header
