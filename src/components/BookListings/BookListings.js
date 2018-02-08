import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Octicon from 'react-octicon'

import './BookListings.css'

import Shelf from '../Shelf'

class BookListings extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func,
    onInfoClick: PropTypes.func
  }

  state = {
    shelvesInfo: [
      {id: "currentlyReading", title: "Currently Reading"},
      {id: "wantToRead", title: "Want to Read"},
      {id: "read", title: "Read"}],
    searchVal : ""
  }

  render(){
    const { shelvesInfo, searchVal } = this.state
    const { books, onShelfChange, onInfoClick } = this.props

    return (
      <div className="book-listings">
        <div className="book-listings-title">
          <h1>MyReads</h1>
        </div>
        {shelvesInfo.map(shelf =>(
          <Shelf
            key={shelf.id}
            id={shelf.id}
            title={shelf.title}
            books={books.filter(books => books.shelf === shelf.id)}
            onShelfChange={onShelfChange}
            onInfoClick={onInfoClick}>
          </Shelf>
        ))}
        <div className="open-search">
          <Link to={{pathname: '/search', search: searchVal }}>
            Add a book
            <Octicon name="plus-small" mega/>
          </Link>
        </div>
      </div>)
  }
}
export default BookListings;
