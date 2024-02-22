import axios from 'axios';

export async function fetchImages(query, currentPage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '42359389-3e7836390f428de58440ba614';

  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: 15,
  };

  const res = await axios.get(BASE_URL, { params });
  return res.data;
}
