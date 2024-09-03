import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import searchImagesByQuery from './js/pixabay-api';
import { createImages, clearImages } from './js/render-functions';

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = new SimpleLightbox('.gallery a');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSubmit(event) {
  event.preventDefault();
  clearImages();
  loader.classList.remove('hidden');
  loadMoreBtn.classList.add('hidden');
  currentQuery = input.value.trim();
  currentPage = 1;
  if (currentQuery === '') {
    iziToast.error({
      position: 'topRight',
      message: 'Please fill the input',
    });
    loader.classList.add('hidden');
    return;
  }

  try {
    const data = await searchImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;
    if (data.total === 0) {
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      createImages(data);
      gallery.refresh();
      if (data.hits.length === 15) {
        loadMoreBtn.classList.remove('hidden');
      }
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: 'Failed to fetch images. Please try again later.',
    });
  } finally {
    loader.classList.add('hidden');
    form.reset();
  }
}

async function handleLoadMore(event) {
  currentPage += 1;
  loader.classList.remove('hidden');

  try {
    const data = await searchImagesByQuery(currentQuery, currentPage);
    if (data.hits.length === 0 || currentPage * 15 >= totalHits) {
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });

      loadMoreBtn.classList.add('hidden');
    } else {
      createImages(data);
      gallery.refresh();
      if (data.hits.length < 15) {
        loadMoreBtn.classList.add('hidden');
      } else {
        loadMoreBtn.classList.remove('hidden');
      }
      smoothScroll();
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: 'Failed to fetch images. Please try again later.',
    });
  } finally {
    loader.classList.add('hidden');
  }
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

setTimeout(() => {
  loader.classList.add('hidden');
}, 100);
