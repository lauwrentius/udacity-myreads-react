import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Octicon from 'react-octicon'

import './BookListings.css'

import Shelf from '../Shelf'

/**
* @description BookListings Class component. Displays 3 shelves on the application page: Currently Reading, Want to Read, Read.
*/
class BookListings extends Component {

  static propTypes = {
    /** Array of Books Object */
    books: PropTypes.array.isRequired,
    /** Callback function when books changes shelf */
    onShelfChange: PropTypes.func,
    /** Callback function when book info button is clicked (passed from Book component) */
    onInfoClick: PropTypes.func
  }

  state = {
    /* Boook shelves Information */
    shelvesInfo: [
      {
        id: "currentlyReading",
        title: "Currently Reading"
      }, {
        id: "wantToRead",
        title: "Want to Read"
      }, {
        id: "read",
        title: "Read"
      }
    ]
  }

  /**
  * @description This function will render the BookListings.
  */
  render() {
    const { shelvesInfo } = this.state
    const { books, onShelfChange, onInfoClick } = this.props

    return (<div className="book-listings">
      <div className="book-listings-title">
        <h1>MyReads</h1>
      </div>
      {shelvesInfo.map(shelf => (<Shelf key={shelf.id} id={shelf.id} title={shelf.title} books={books.filter(books => books.shelf === shelf.id)} onShelfChange={onShelfChange} onInfoClick={onInfoClick}></Shelf>))}
      <div className="open-search">
        <Link to={{
            pathname: '/search',
            search: ''
          }}>
          Add a book
          <Octicon name="plus-small" mega />
        </Link>
      </div>
    </div>)
  }
}
export default BookListings
