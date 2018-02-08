import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Octicon from 'react-octicon'

import './BookInfo.css'

class BookInfo extends Component {
  static propTypes = {
    bookInfo: PropTypes.object,
    onInfoClose: PropTypes.func
  }

  componentWillReceiveProps = (nextProps) => {
    // console.log(nextProps)
    // this.setState({})
    if( !nextProps.book ) return;

    this.setState({display: true})
    // console.log(nextProps.book.authors
    //     .map((author, i)=> <span key={i} className="bookinfo-author">{author}</span>)
    //     .reduce((a,b)=> [a,b]));
  }

  render() {
    const { bookInfo, onInfoClose } = this.props

    if(bookInfo === null)
      return ("")

    return (
      <div className="bookinfo">
        <div className="bookinfo-wrapper">
          <button className="bookinfo-closePanel"
            onClick={onInfoClose}>
            <Octicon name="x"/>
          </button>

          <div className="bookinfo-thumbs-wrapper">
            <div className="bookinfo-thumbs"
              style={{ backgroundImage: `url(${bookInfo.imageLinks.smallThumbnail})`
              }}></div>
          </div>
          <div className="bookinfo-content">
          <p><b>Title:</b> <span>{ bookInfo.title }</span>
            <a className="bookinfo-linkexternal" href={ bookInfo.previewLink } target="_blank">
              <Octicon name="link-external"/>
            </a></p>
          <p><b>Subtitle:</b> { bookInfo.subtitle }</p>

          <p><b>Authors:</b> {bookInfo.authors.map((author, i)=>
            <span key={i}>{author}</span>).reduce((a,b) =>[a,', ',b])}</p>

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
