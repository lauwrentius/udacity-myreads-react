import React, {Component} from 'react'
import {Route, withRouter} from 'react-router-dom'

import BookListings from '../components/BookListings'
import SearchListings from '../components/SearchListings'
import BookInfo from '../components/BookInfo'

import * as BooksAPI from '../utils/BooksAPI'
import './App.css'

/**
* @description Books App. This class handles the shelf changes, searchresult from the BooksAPI, and boksInfo.
*/
class App extends Component {

  state = {
    /** Array of Books on the 3 shelves loaded from BooksAPI */
    books: [],

    /** Book Search Object. Contains the search terms and Array of books Search Results  */
    bookSearch: {
      searchTerm: "",
      searchResults: []
    },

    /** Book Info state. Contains information for additional book details   */
    bookInfo: null
  }

  /**
  * @description App Constructor. This constructor will add a listener for browser history changes to change the state accordingly.
  */
  constructor(props) {
    super(props);

    this.props.history.listen((location, action) => {
      if (location.pathname === "/search") {
        let searchTerms = location.search.substring(1)
        if (this.state.bookSearch.searchTerm !== searchTerms) {
          this.onBookSearch(searchTerms, false)
        }
      }
    });
  }

  /**
  * @description This function will call BooksAPI for the current list of books to be displayed on the shelves.
  */
  componentDidMount() {
    BooksAPI.getAll().then(res => {
      let books = res
      this.setState({books})
    })
  }

  /**
  * @description This function is called when an array of Books are added from the searchResults.
  * @param {array} booksAdd - Array of books to be added from the search results
  * @param {string} type - the bookshelf target desitination
  */
  onAddBooks = (booksAdd, type) => {
    let searchResults = this.state.bookSearch.searchResults
    let books = this.state.books

    for (let i = 0; i < booksAdd.length; i++) {
      let book = Object.assign({}, booksAdd[i], {shelf: type})
      searchResults = searchResults.filter(e => e.id !== booksAdd[i].id)
      books = books.concat(book)
    }
    this.setState({
      bookSearch: {
        searchTerm: this.state.bookSearch.searchTerm,
        searchResults: searchResults
      },
      books: books
    })
  }

  /**
  * @description This function is called when an array of Books are moved from one shelves to another.
  * @param {array} booksAdd - Array of books to be moved
  * @param {string} type - the bookshelf target desitination
  */
  onShelfChange = (booksMove, type) => {
    let books = this.state.books.map(book => {
      if (booksMove.find(e => e.id === book.id) !== undefined) {
        BooksAPI.update(book, type)
        return Object.assign({}, book, {shelf: type})
      }
      return book
    })
    this.setState({books})
  }

  /**
  * @description This function is called to search book. this function will call bookAPI
  * @param {string} str - the string search query for book search.
  * @param {bool} pushHistory - Optiona param to push the history/not after getting the results from BookAPI.
  */
  onBookSearch = (str, pushHistory) => {
    let bookSearch = {
      searchTerm: str,
      searchResults: []
    }
    BooksAPI.search(str).then(res => {
      if (res.error) {
        this.setState({bookSearch})
        return
      }
      bookSearch.searchResults = res.filter(book => !this.state.books.find(e => e.id === book.id))

      if (pushHistory !== false)
        this.props.history.push('/search?' + str)

      this.setState({bookSearch})
    }).catch(res => {
      this.setState({bookSearch})
    })
  }

  /**
  * @description This function is called to to display addional details for a specific book.
  * @param {Object} bookInfo - The book object containing book details.
  * @param {Obect} evt - click event.
  */
  onInfoClick = (bookInfo, evt) => {
    this.setState({bookInfo})
  }

  /**
  * @description This function is called whever the book details popup are closed.
  */
  onInfoClose = () => {
    this.setState({bookInfo: null})
  }
 
  /**
  * @description This function will render the application.
  */
  render() {
    const {books, bookSearch, bookInfo} = this.state
    return (<div className="app">
      <Route exact path='/' render={() => (<BookListings books={books} onShelfChange={this.onShelfChange} onInfoClick={this.onInfoClick}></BookListings>)}/>
      <Route path='/search' render={() => (<SearchListings onShelfChange={this.onAddBooks} onBookSearch={this.onBookSearch} onInfoClick={this.onInfoClick} bookSearch={bookSearch}></SearchListings>)}/>
      <BookInfo bookInfo={bookInfo} onInfoClose={this.onInfoClose}></BookInfo>
    </div>)
  }
}

export default withRouter(App)
