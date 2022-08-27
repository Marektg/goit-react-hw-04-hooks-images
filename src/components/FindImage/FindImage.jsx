import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import { fetchImages } from 'service/fetchImage';
import ImageGallery from 'components/ImageGallery/ImageGallery'

export class FindImage extends Component {
    static propTypes = {}
    state = {
        images: [],
        page: 1,
    }

    searchingImages(key) {
        fetchImages(key.trim(), 1)
            .then(images => {
                console.log(images.hits);
                images.hits.map(({ id, webformatURL, largeImageURL, webformatWidth, webformatHeight, tags }) => {
                    this.setState({ ...this.state, images: [...this.state.images, { id: id, webLink: webformatURL, webHeihgt: webformatHeight, webWidth: webformatWidth, largeLink: largeImageURL, tags: tags }] })
                });
                console.log(this.state)
            })
            .catch(error => console.log(error));
        
    };
    
    handleFormSubmit = (ev) => {
        ev.preventDefault();
        const form = ev.currentTarget;
        const searchField = form.elements.search.value;
        this.searchingImages(searchField);

    };

    componentDidUpdate() {
    
}

  render() {
    return (
        <div>
            <Searchbar submitHandler={this.handleFormSubmit} />
            <ImageGallery />
        </div>
       
    )
  }
}

export default FindImage