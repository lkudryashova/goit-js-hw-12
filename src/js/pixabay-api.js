import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const searchImagesByQuery = (searchedValue, page) => {
  const axiosOptions = {
    params: {
      key: '45767028-18ffee8ca72084a8354af7c89',
      q: searchedValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
    },
  };
  return axios.get('', axiosOptions);
};
