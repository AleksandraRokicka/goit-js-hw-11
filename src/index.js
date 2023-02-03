import Notiflix from 'notiflix';
import axios from 'axios';

const form = document.querySelector('.search-form');
const input = document.querySelector('[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const searchButton = document.querySelector('button[type="submit"]');
const loadingButton = document.querySelector('.load-more');

let value = '';

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
const url = 'https://pixabay.com/api/';


async function fetchImages() {
    const urlApi = `https://pixabay.com/api/?key=${key}&q=${value}&image_type=${image_type}&orientation=${orientation}&safe_search=${safesearch}&lang=${lang}&per_page=${per_page}&page=${currentPage}`;
    try {
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

        // if (images.length === 0) {
        // Notiflix.Notify.failure(
        //   'Sorry, there are no images matching your search query. Please try again.');
        // return;
        // }
        // if (images.length < images.per_page) {
        //   Notiflix.Notify.warning(
        //     "We're sorry, but you've reached the end of search results."
        //   );
        // }

  } catch (error) {
    console.error(error);
  }
}
fetchImages();


/* <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>; */

// webformatURL - link do małego obrazka.
// largeImageURL - link do dużego obrazka.
// tags - wiersz z opisem obrazka. Będzie pasować do atrybutu alt.
// likes - liczba lajków.
// views - liczba wyświetleń.
// comments - liczba komentarzy.
// downloads - liczba pobrań