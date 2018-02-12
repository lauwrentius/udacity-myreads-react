import React, {Component} from 'react'
import PropTypes from 'prop-types'

import ShelfSelectBtn from '../ShelfSelectBtn'
import Book from '../Book'

import './Shelf.css'

/**
* @description Shelf component. Displays an array of books on shelf.
*/
class Shelf extends Component {
  static propTypes = {
    /** The shelf id. */
    id: PropTypes.string.isRequired,
    /** The shelf display title. */
    title: PropTypes.string.isRequired,
    /** An array of books on the current shelf. */
    books: PropTypes.array.isRequired,
    /** Callback function when a book/s changes shelf */
    onShelfChange: PropTypes.func,
    /** Callback function when book info button is clicked */
    onInfoClick: PropTypes.func
  }

  state = {
    /** Track which books are being selected (for moving in batches) */
    bookSelected: []
  }

  /**
  * @description This function is deselecting all of the selected books whenever the books are moved.
  * @param {object} nextProps - next prop for Shelf
  * @param {object} nextState - next state for Shelf
  */
  componentWillReceiveProps = (nextProps, nextState) => {
    if (nextProps.books.length !== this.state.bookSelected.length) {
      this.setState({
        bookSelected: new Array(nextProps.books.length).fill(false)
      })
    }
  }

  /**
  * @description This function deselects books whenever the books are moved.
  * @param {object} nextProps - next prop for Shelf
  * @param {object} nextState - next state for Shelf
  */
  handleInputChange = (i, evt) => {
    let bookSelected = this.state.bookSelected.slice()
    bookSelected[i] = !bookSelected[i]
    this.setState({bookSelected})
  }

  /**
  * @description This function is called when the user moves books in batches
  * @param {object} evt - Shelf change event
  */
  onBatchShelfChange = (evt) => {
    var books = this.props.books.filter((book, i) => this.state.bookSelected[i])

    this.props.onShelfChange(books, evt)
  }

  /**
  * @description This function will render the Book Shelf.
  */
  render() {
    const {id, title, books, onShelfChange, onInfoClick} = this.props

    return (<div className="bookshelf">
      <h2 className="bookshelf-title">
        {title}
        <span className="bookshelf-select">
          <ShelfSelectBtn val={id} onShelfChange={this.onBatchShelfChange}></ShelfSelectBtn>
        </span>
      </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books.map((book, i) => (<li key={book.id}>
              <label>
                <input className="shelf-checkbox" type="checkbox" name="chk_group" checked={this.state.bookSelected[i]} onChange={this.handleInputChange.bind(null, i)}/>
                <Book onShelfChange={onShelfChange.bind(null, [book])} onInfoClick={onInfoClick} book={book}></Book>
              </label>
            </li>))
          }
        </ol>
      </div>
    </div>)
  }
}
export default Shelf;
