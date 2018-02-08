import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ShelfSelectBtn from '../ShelfSelectBtn'
import Book from '../Book'

import './Shelf.css'

class Shelf extends Component {
  state = {
    bookSelected: []
  }

  static propTypes = {
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      books: PropTypes.array.isRequired,
      onShelfChange:  PropTypes.func,
      onInfoClick:  PropTypes.func
  }

  componentWillReceiveProps = (nextProps, nextState) => {
    if( nextProps.books.length !== this.state.bookSelected.length){
      this.setState({
        bookSelected: new Array(nextProps.books.length).fill(false)
      })
    }
  }

  handleInputChange = (i, evt) => {
    // console.log( evt, i )
    let bookSelected = this.state.bookSelected.slice()
    bookSelected[i] = !bookSelected[i]
    this.setState({bookSelected})
  }
  onBatchShelfChange = (evt) => {
    // console.log(evt, this.props)
    var books = this.props.books.filter(
      (book,i) => this.state.bookSelected[i] )

    this.props.onShelfChange(books, evt)
  }

  render(){
    const { id, title, books, onShelfChange, onInfoClick } = this.props

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {title}
          <span className="bookshelf-select">
            <ShelfSelectBtn
              val={id}
              onShelfChange={this.onBatchShelfChange}>
            </ShelfSelectBtn>
          </span>
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map( (book,i) =>(
              <li key={book.id}>
                <label>
                  <input
                    className="shelf-checkbox"
                    type="checkbox"
                    name="chk_group"                    checked={this.state.bookSelected[i]}
                    onChange={this.handleInputChange.bind(null, i)} />
                  <Book
                    onShelfChange={onShelfChange.bind(null, [book])}
                    onInfoClick={onInfoClick}
                    book={book}></Book>
                </label>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}
export default Shelf;
