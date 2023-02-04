import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import './css/styles.css';

const url = 'https://pixabay.com/api/';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const searchButton = document.querySelector('button[type="submit"]');
const loadingButton = document.querySelector('.load-more');

const perPage = 40;
let currentPage = 1;

const dataFromApi = {
  key: '33350388-38e3ff766672c2db25ae5770d', // twój unikalny klucz dostępu do API - dostepny po zarejestrowaniu sie
  image_type: 'photo', // typ obrazka.Chcemy tylko zdjęć, dlatego określ wartość photo.
  orientation: 'horizontal', // orientacja zdjęcia. Określ wartość horizontal.
  safesearch: 'true', // weryfikacja wieku. Określ wartość true.
  lang: 'en', // en jako wartosc default, nie trzeba pisac. jezyk wyszukiwania
  per_page: 20, // Determine the number of results per page. Accepted values: 3 - 200 Default: 20
};
const { key, image_type, orientation, safesearch, lang, per_page } =
  dataFromApi;


const lightbox = new SimpleLightbox('.gallery a', {
  captionSelector: 'title',
  close: true,
  nav: true,
  escKey: true,
  captionSelector: 'img',
  captionsData: 'alt',
  captionDelay: 250,
});


async function fetchImages() {
  const input = document.querySelector("input[name='searchQuery']");
  const searchTerm = input.value;
  const urlApi = `https://pixabay.com/api/?key=${key}&q=${searchTerm}&image_type=${image_type}&orientation=${orientation}&safe_search=${safesearch}&lang=${lang}&per_page=${per_page}&page=${currentPage}`;
  try {
    let value = '';
    const response = await axios.get(urlApi);
    console.log(response);
    const images = response.data.hits;
    console.log(images);

   gallery.insertAdjacentHTML(
     'beforeend',
     images
       .map(
         el => `<div class="photo-card"><img src="${el.webformatURL} alt="${el.tags}" loading="lazy"/> <div class="info"><p class="info-item"><b>Likes: ${el.likes}</b></p><p class="info-item"><b>Views: ${el.views}</b></p><p class="info-item">
      <b>Comments: ${el.comments}</b></p><p class="info-item"><b>Downloads: ${el.downloads}</b></p></div></div>`
       )
       .join('')
   );

    if (images.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    if (images.length < images.perPage) {
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }

    currentPage += 1;
  } catch (error) {
    console.error(error);
  }
}

searchButton.addEventListener('click', fetchImages);
loadingButton.addEventListener('click', fetchImages);
form.addEventListener('submit', function (event) {
  event.preventDefault();
  currentPage = 1;
  gallery.innerHTML = '';
  fetchImages();
});

// function clearImageGallery() {
//   gallery.innerHTML = '';
// }
