import React, { Component } from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
// import update from 'immutability-helper'
import _ from 'lodash'

import BookListings from '../components/BookListings'
import SearchListings from '../components/SearchListings'
import BookInfo from '../components/BookInfo'

import * as BooksAPI from '../utils/BooksAPI'
import './App.css'
// import Shelf from '../components/Shelf'
// import SearchBook from './components/SearchBook'


class BooksApp extends Component {

  state = {
    books: [],
    bookSearch: {
      searchTerm: "",
      searchResults: []
    },
    bookInfo: null
  }

  constructor(props) {
    super(props);

    this.props.history.listen((location, action) => {
      if(location.pathname === "/search"){
        let searchTerms = location.search.substring(1)
        if(this.state.bookSearch.searchTerm !== searchTerms){
          console.log("DO SEARCH");
          this.onBookSearch(searchTerms, false)
        }
      }
      console.log("on route change", location, action);
    });
   }


  componentDidMount(){
    const { location } = this.props

    //BooksAPI.update({id:"nggnmAEACAAJ"}, "read").then(res=>console.log("RES1",res))
    // console.log(location,'', this.props.match)


    BooksAPI.getAll().then(res => {
      let books = res
      this.setState({books})
    })
  }
  componentWillReceiveProps = nextProps => {
    // console.log(this.props.location, "!==",nextProps.location)
    if (this.props.location !== nextProps.location) {
      console.log( nextProps, nextProps.location )
    // let searchStr = nextProps.location.search.substring(1)
    // this.bookSearch(searchStr)
    }
  }

  onAddBooks = (booksAdd, type) => {
    console.log("ONBOOKSADD", booksAdd)
    let searchResults = this.state.bookSearch.searchResults
    let books = this.state.books

    for(let i=0; i<booksAdd.length;i++) {
      let book = Object.assign({}, booksAdd[i], {shelf: type} )
      searchResults = searchResults.filter(e=> e.id !== booksAdd[i].id)
      books = books.concat(book)
    }
    this.setState({bookSearch: {
        searchTerm: this.state.bookSearch.searchTerm,
        searchResults: searchResults },
      books: books
    })
  }

  onShelfChange = (booksMove, type) => {
    let books = this.state.books.map( book => {
      if( booksMove.find( e=> e.id === book.id) !== undefined){
        BooksAPI.update(book,type)
        return Object.assign({}, book, {shelf: type})
      }
      return book
    })
    this.setState({books})
  }

  onBookSearch = (str, pushHistory) => {
    console.log("ONBOOKSEARCH",str,pushHistory)
    let bookSearch = {
      searchTerm: str,
      searchResults: []
    }
    BooksAPI.search(str)
      .then(res => {
        if(res.error){
          this.setState({bookSearch})
          return
        }
        bookSearch.searchResults = res.filter(
          book => !this.state.books.find( e => e.id === book.id))

        if(pushHistory !== false)
          this.props.history.push('/search?'+str)
          
        this.setState({bookSearch})
      }).catch(res => {
        console.log("error")
        this.setState({bookSearch})
      })
  }

  onInfoClick = (bookInfo, evt) => {
    this.setState({bookInfo})
  }
  onInfoClose = () => {
    this.setState({bookInfo: null})
  }

  render() {
    const { books, bookSearch, bookInfo } = this.state
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookListings books={books}
            onShelfChange={this.onShelfChange}
            onInfoClick={this.onInfoClick}></BookListings>
        )}/>
        <Route path='/search' render={() => (
          <SearchListings
            onShelfChange={this.onAddBooks}
            onBookSearch={this.onBookSearch}
            onInfoClick={this.onInfoClick}
            bookSearch={bookSearch}>
          </SearchListings>
        )}/>
        <BookInfo
          bookInfo={bookInfo}
          onInfoClose={this.onInfoClose}>
        </BookInfo>
      </div>
    )
  }
}

export default withRouter(BooksApp)
