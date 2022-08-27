import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem"

export class ImageGallery extends Component {
  static propTypes = {}

  render() {
    return (
        <ul class="gallery">
            <ImageGalleryItem />
        </ul>
    )
  }
}

export default ImageGallery