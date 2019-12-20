import React from "react"
import Search from "./components/search/Search"
import Login from "./components/Users/Login"

import "./App.css"
import logo from "./logo.svg"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" src={logo} alt="logo" />
      </header>
      <Login />
    </div>
  )
}

export default App
