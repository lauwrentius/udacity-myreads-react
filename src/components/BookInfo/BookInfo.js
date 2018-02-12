import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Octicon from 'react-octicon'

import './BookInfo.css'

class BookInfo extends Component {
  static propTypes = {
    bookInfo: PropTypes.object,
    onInfoClose: PropTypes.func
  }

  render() {
    const { bookInfo, onInfoClose } = this.props

    if(bookInfo === null)
      return ("")

    let authors, bookBG

    if (bookInfo.authors)
      authors = bookInfo.authors.map((author, i)=>
        <span key={i}>{author}</span>).reduce((a,b) =>[a,', ',b])
    else
      authors = N/A

    if (bookInfo.imageLinks)
      bookBG = bookInfo.imageLinks.smallThumbnail

    return (
      <div className="bookinfo">
        <div className="bookinfo-wrapper">
          <button className="bookinfo-closePanel"
            onClick={onInfoClose}>
            <Octicon name="x"/>
          </button>

          <div className="bookinfo-thumbs-wrapper">
            <div className="bookinfo-thumbs"
              style={{ backgroundImage: `url(${bookBG})`
              }}></div>
          </div>
          <div className="bookinfo-content">
          <p><b>Title:</b> <span>{ bookInfo.title }</span>
            <a className="bookinfo-linkexternal" href={ bookInfo.previewLink } target="_blank">
              <Octicon name="link-external"/>
            </a></p>
          <p><b>Subtitle:</b> { bookInfo.subtitle }</p>

          <p><b>Authors:</b> {authors} </p>

          <p><b>Page Count:</b> { bookInfo.pageCount }</p>
          <p><b>Description:</b> { bookInfo.description }</p>
          <p><b>Published:</b> { bookInfo.publisher }, { bookInfo.publishedDate }</p>
          <b>ISBN-10:</b> { bookInfo.industryIdentifiers[0].identifier }<br />
          <b>ISBN-13:</b> { bookInfo.industryIdentifiers[1].identifier }
          </div>
        </div>
      </div>
    )
  }
}

export default BookInfo
