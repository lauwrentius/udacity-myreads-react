import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Octicon from 'react-octicon'

import './Book.css'

import ShelfSelectBtn from '../ShelfSelectBtn'

/**
* @description Book Class component. Displays a single book on a shelf.
*/
class Book extends Component {
  static propTypes = {
    /** Book Object info */
    book: PropTypes.object.isRequired,
    /** Callback function when book changes shelf */
    onShelfChange: PropTypes.func.isRequired,
    /** Callback function when book info button is clicked */
    onInfoClick: PropTypes.func.isRequired
  }

  /**
  * @description This function will render the Book.
  */
  render() {
    const {book, onShelfChange, onInfoClick} = this.props

    let authors, bookBG

    if (book.authors)
      authors = (<div className="book-authors">
        {book.authors.map((author, i) => <span key={i} className="book-author">{author}</span>)}
      </div>)

    if (book.imageLinks)
      bookBG = book.imageLinks.smallThumbnail

    return (<div className="book">
      <div className="book-top">
        <div className="book-cover" style={{
            width: '128px',
            height: '193px',
            backgroundImage: `url(${bookBG})`
          }}></div>
        <div className="book-info-btn">
          <button onClick={onInfoClick.bind(null, book)}>
            <Octicon name="eye"/>
          </button>
        </div>
        <div className="select-shelf-container">
          <ShelfSelectBtn onShelfChange={onShelfChange} val={(
              book.shelf !== undefined)
              ? book.shelf
              : "none"}></ShelfSelectBtn>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {authors}
    </div>)
  }
}
export default Book;
