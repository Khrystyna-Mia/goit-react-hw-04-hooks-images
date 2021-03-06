import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '25738205-42a7db76025be689580da6194';

const ImagesApiService = (query, page) => {
  return axios(
    `${API_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => response.data.hits);
};

/* -------------------------------------------- */

// class ImagesApiService {
//   constructor() {
//     this.query = '';
//     this.page = 1;
//   }

//   async fetchImg() {
//     const response = await axios.get(
//       `${API_URL}?q=${this.query}&page=${this.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//     );
//     // this.incrementPage();
//     return response.data.hits;
//   }

//   get searchQuery() {
//     return this.query;
//   }

//   set searchQuery(newQuery) {
//     this.query = newQuery;
//   }

//   incrementPage() {
//     this.page += 1;
//   }

//   // resetPage() {
//   //   this.page = 1;
//   // }
// }

export default ImagesApiService;
