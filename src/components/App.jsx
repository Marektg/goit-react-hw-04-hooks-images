import React, { Component } from 'react';
import styles from './App.module.scss';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import { fetchImages } from '../service/fetchImage';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';


export class App extends Component {
  state = {
    images: [],
    searchWord: '',
    page: 1,
    isLoading: false,
    error: null,
    foundImages: null,
    currentLargeImg: null,
  }

  setInitialParams = (searchWord) => {
    if (searchWord === '') {
      return Notiflix.Notify.failure("Enter the search value!"); 
      };
    

    if (searchWord === this.state.searchWord) {
      return;
    }

    this.setState({
      images: [],
      searchWord,
      page: 1,
    });
  }

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  }

  addImages = async (searchWord, page) => {
    this.setState({ isLoading: true });

    try {
      const data = await fetchImages(searchWord, page);
      const { hits: newImages, totalHits: foundImages } = data;

      this.setState(oldState => ({
        images: [...oldState.images, ...newImages],
      }));

      if (foundImages !== this.state.foundImages) {
        this.setState({ foundImages });
      };
    
      if (newImages.length === 0) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search word. Please try again.");
      } 
    } catch (error) {
      this.setState({ error })
    } finally {
      this.setState({ isLoading: false });
    }
  }

  openModal = (srcLargeImg, altInfo) => {
    this.setState({
      currentLargeImg: {
        src: srcLargeImg,
        alt: altInfo,
      }
    });
  }

  closeModal = (evt) => {
    this.setState({ currentLargeImg: null });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.page !== this.state.page || prevState.searchWord !== this.state.searchWord) {
      const { searchWord, page } = this.state;
      this.addImages(searchWord, page);
    }
  }
 



  render() {
    const { app } = styles;
    const { images, isLoading, error, foundImages, currentLargeImg } = this.state;

    return (
      <div className={app}>
        <Searchbar onSubmit={this.setInitialParams} />
        {isLoading && <Loader />}
        {error && <p>Whoops, something went wrong: {error.message}</p>}
      
        {images.length !== 0 &&
          <>
            <ImageGallery
              items={images}
              openModal={this.openModal}
            />
            {images.length < foundImages &&
              <Button loadMore={this.loadMore} />
            }
          </>
        }
        
        {currentLargeImg && <Modal closeModal={this.closeModal} imgData={currentLargeImg} />}
      </div>
    );
  }
};

export default App;