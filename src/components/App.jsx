import React, { useCallback, useEffect, useState } from 'react';
import styles from './App.module.scss';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import { fetchImages } from '../service/fetchImage';
import Searchbar from './Searchbar/Searchbar';
import  ImageGallery  from './ImageGallery/ImageGallery';
import  Button  from './Button/Button';
import  Loader  from './Loader/Loader';
import Modal from './Modal/Modal';



const App = () => {
  const [images, setImages] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalImages, setTotalImages] = useState(0);
  const [currentLargeImg, setCurrentLargeImg] = useState(null);

  const setInitialParams = (word) => {
    if (word === "") {
      Notiflix.Notify.failure("Enter the search value!");
      return;
    }

    if (word === searchWord) {
      return;
    }

    setImages([]);
    setSearchWord(word);
    setPage(1);
  }

  const loadMore = () => {
    setPage(page + 1);
  }

  const addImages = useCallback(async () => {
    setIsLoading(true);

    try {
      if (!searchWord) {
        return;
      }

      const data =await fetchImages(searchWord, page);
      const { hits: newImages, totalHits: foundImages } = data;

      setImages(oldImages => [...oldImages, ...newImages]);
      setTotalImages(foundImages);
      if (newImages.length === 0) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search word. Please try again.");
      } 
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [searchWord, page],
)


  const openModal = (src, alt) => {
    setCurrentLargeImg({ src, alt });
  }

  const closeModal = (evt) => {
    setCurrentLargeImg(null);
  }

  useEffect(() => {
    addImages();
  }, [addImages]);

  const { app, notification } = styles;

  return (
    <div className={app}>
      <Searchbar onSubmit={setInitialParams} />
      {error && <p className={notification}>Whoops, something went wrong: {error.message}</p>}
      {isLoading && <Loader />}
      {images.length > 0 &&
        <>
          <ImageGallery
            items={images}
            openModal={openModal}
          />
          {images.length < totalImages &&
            <Button loadMore={loadMore} />
          }
        </>
      }
      {currentLargeImg && <Modal closeModal={closeModal} imgData={currentLargeImg} />}
      
    </div>
  );
}

export default App;
