import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '45767028-18ffee8ca72084a8354af7c89';

export default function searchImagesByQuery(query, page = 1) {
  return axios
    .get(URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
      },
    })
    .then(response => response.data)
    .catch(error => {
      iziToast.error({
        position: 'topRight',
        message: `Failed to fetch images: ${error.message}`,
      });
    });
}
