import { fetchImages } from './js/pixabay-api.js';
import { imagesTemplate } from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  formElem: document.querySelector('.js-search'),
  imagesElem: document.querySelector('.gallery'),
  loadElem: document.querySelector('.js-loader'),
  btnLoadMore: document.querySelector('.btn-loader'),
};

const refreshPage = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

let query;
let page;
let maxPage;

refs.formElem.addEventListener('submit', onFormSubmit);
refs.btnLoadMore.addEventListener('click', onLoadMoreClick);

async function onFormSubmit(e) {
  e.preventDefault();

  query = e.target.elements.search.value.trim();
  page = 1;

  if (!query) {
    showError('Please fill in the form');
    return;
  }
  showLoader();

  try {
    const data = await fetchImages(query, page);
    if (data.totalHits === 0) {
      showError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }
    maxPage = Math.ceil(data.totalHits / 15);
    refs.imagesElem.innerHTML = '';
    renderImages(data.hits);
  } catch (err) {
    showError(err);
    maxPage = 0;
    refs.imagesElem.innerHTML = '';
  }

  refreshPage.refresh();
  hideLoader();
  checkVisibleBtnStatus();
  e.target.reset();
}

async function onLoadMoreClick() {
  page += 1;
  showLoader();
  const data = await fetchImages(query, page);
  renderImages(data.hits);
  refreshPage.refresh();
  hideLoader();
  checkVisibleBtnStatus();

  const height =
    refs.imagesElem.firstElementChild.getBoundingClientRect().height;
  scrollBy({
    behavior: 'smooth',
    top: height * 2,
  });
}

function renderImages(hits) {
  const markup = imagesTemplate(hits);
  refs.imagesElem.insertAdjacentHTML('beforeend', markup);
}

function showLoadBtn() {
  refs.btnLoadMore.classList.remove('hidden');
}
function hideLoadBtn() {
  refs.btnLoadMore.classList.add('hidden');
}

function showLoader() {
  refs.loadElem.classList.remove('hidden');
}
function hideLoader() {
  refs.loadElem.classList.add('hidden');
}
function showError(msg) {
  iziToast.error({
    title: 'Error',
    message: msg,
  });
}
function checkVisibleBtnStatus() {
  if (page >= maxPage) {
    hideLoadBtn();
    showError(`We're sorry, but you've reached the end of search results.`);
  } else {
    showLoadBtn();
  }
}
