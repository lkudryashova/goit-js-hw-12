import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { searchImagesByQuery } from './js/pixabay-api';
import { createGalleryCardTemplate } from './js/render-functions';

const form = document.querySelector('.search-form'); //OK
const galleryList = document.querySelector('.gallery-list'); //OK
const input = document.querySelector('.search-input'); //OK
const loader = document.querySelector('.loader'); //OK
const loadMoreBtn = document.querySelector('.load-more'); //OK
loadMoreBtn.insertAdjacentElement('afterend', loader);
const simpleLightbox = new SimpleLightbox('.gallery-list a', {
  captionDelay: 250,
  captionPosition: 'bottom',
  captionsData: 'alt',
  overlayOpacity: 1,
});

let currentPage = 1;
let currentQuery = '';
let elementsQuantity = 0;

const onFormSubmit = async event => {
  try {
    event.preventDefault();
    currentQuery = input.value.trim();
    if (currentQuery === '') {
      iziToast.error({
        position: 'topRight',
        message: 'Please fill the input',
      });
      return;
    }
    galleryList.innerHTML = '';
    elementsQuantity = 0;
    loader.classList.remove('hidden');
    currentPage = 1;
    const response = await searchImagesByQuery(currentQuery, currentPage);
    const data = response.data;
    if (!data.hits || data.hits.length === 0) {
      iziToast.error({
        position: 'bottomRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      galleryList.innerHTML = '';
      form.reset();
      loader.classList.add('hidden');
      loadMoreBtn.classList.add('hidden');
      return;
    }

    const galleryCardTemplate = data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');
    galleryList.innerHTML = galleryCardTemplate;
    simpleLightbox.refresh();
    loadMoreBtn.classList.remove('hidden');
    form.reset();
    elementsQuantity += response.data.hits.length;
  } catch (err) {
    console.error('Error fetching images:', err.message);
    console.error('Error stack trace:', err.stack);
    console.log(err);
    iziToast.error({
      position: 'topRight',
      message: 'Failed to fetch images. Please try again later.',
    });
  } finally {
    loader.classList.add('hidden');
  }
};

const onLoadMoreBtnClick = async event => {
  try {
    currentPage += 1;
    const response = await searchImagesByQuery(currentQuery, currentPage);
    const data = response.data;
    if (!data.hits || data.hits.length === 0) {
      loadMoreBtn.classList.add('hidden');
      return;
    }
    const galleryCardTemplate = data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');
    galleryList.insertAdjacentHTML('beforeend', galleryCardTemplate);
    simpleLightbox.refresh();
    const { height: cardHeight } =
      galleryList.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    elementsQuantity += response.data.hits.length;

    if (Math.ceil(data.totalHits / 15) === currentPage) {
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'bottomRight',
      });
      loader.classList.add('hidden');
      loadMoreBtn.classList.add('hidden');
    }
  } catch (err) {
    console.log(err);
  }
};

setTimeout(() => {
  loader.classList.add('hidden');
}, 300);

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
