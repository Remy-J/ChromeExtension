/*global chrome*/
// permet d'utiliser l'API de chrome
import React, { Component } from "react"
import "./Search.css"
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: "",
      crawlers: {}
    }
  }

  getUrl = () => {
    chrome.tabs.getSelected(tab => {
      const urlTab = tab.url
      this.setState({
        url: urlTab
      })
    })
  }

  getCrawlers() {
    const crawlerAPI = process.env.FOLHOMEE_API_CRAWLERS
    const universe = process.env.FOLHOMEE_UNIVERSE_CRAWLERS
    const token = process.env.FOLHOMEE_TOKEN_CRAWLERS

    const headers = new Headers({
      "x-universe-token": universe,
      "x-access-token": token
    })
    const method = "get"
    const option = {
      method,
      headers
    }
    return Promise.resolve().then(() => {
      fetch(crawlerAPI, option)
        .then(response => response.json())
        .then(data => {
          this.setState({
            crawlers: data.crawlers
          })
        })
    })
  }

  handleClick = event => {
    event.preventDefault()
    const API_URI = process.env.FOLHOMEE_API_URI
    const universe = process.env.FOLHOMEE_UNIVERSE_API
    const headers = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-universe-token": universe
    })
    const method = "put"
    let url = this.state.url.trim()
    const crawlersUrl = this.state.url.replace(/.$/, "")
    const domain = url.replace(/.+www./, "").replace("/", "")
    const data = {
      title: `Crawler ${domain}`,
      message: url,
      tags: "crawler"
    }
    const option = {
      method,
      headers,
      body: JSON.stringify(data)
    }
    const crawlers = this.state.crawlers
    return Promise.resolve()
      .then(() => {
        if (!crawlers.find(elem => elem.url === crawlersUrl)) {
          fetch(API_URI, option)
            .then(response => response.json())
            .then(response => alert("le ticket a été créé"))
        } else alert("le Crawler existe déjà")
      })
      .catch(error => alert("Erreur : " + error))
  }
  componentDidMount() {
    this.getUrl()
    this.getCrawlers()
  }
  render() {
    return (
      <form>
        <label>
          <input type="text" name="name" value={this.state.url} />
        </label>
        <button onClick={this.handleClick}>CHECK</button>
      </form>
    )
  }
}

export default Search
