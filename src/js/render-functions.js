import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const createGalleryCardTemplate = imgInfo => {
  return ` <li class="gallery-item">
    <a class="gallery-link" href="${imgInfo.largeImageURL}">
      <img class="image"
      src="${imgInfo.webformatURL}"
      alt="${imgInfo.tags}"
      loading="lazy" />
    </a>
    <ul class="gallery-info">
    <div class="text-wraper">
    <div class="text-block">
        <h2>Likes</h2>
        <p>${imgInfo.likes}</p>
      </div>
      <div class="text-block">
        <h2>Views</h2>
        <p>${imgInfo.views}</p>
      </div>
        <div class="text-block">
        <h2>Comments</h2>
        <p>${imgInfo.comments}</p>
      </div>      
        <div class="text-block">
        <h2>Downloads</h2>
        <p>${imgInfo.downloads}</p>
      </div>
      </div>
     </ul>
  </li>`;
};
