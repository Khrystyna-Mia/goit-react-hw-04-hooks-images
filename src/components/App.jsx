import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImagesApiService from 'services/api';

import Container from './Container';
import Searchbar from './Searchbar';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Button from './Button';

const imagesApiService = new ImagesApiService();

// const App = () => {
//   const [images, setImages] = useState([]);
//   const [searchQuery, setQuery] = useState('');
//   const [currentPage, setPage] = useState(1);
//   const [largeImageURL, setLargeImageURL] = useState('');
//   const [isLoading, setLoading] = useState(false);
//   const [showModal, setModal] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!searchQuery) return;

//     const fetchImage = async () => {
//       try {
//         setLoading(true);

//         const images = await ImagesApiService(searchQuery, currentPage);
//         setImages(prevImages => [...prevImages, ...images]);
//       } catch (error) {
//         setError({ error });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchImage();
//   }, [searchQuery, currentPage]);

//   const onSearchFormSubmit = query => {
//     setImages([]);
//     setQuery(query);
//     setPage(1);
//     setLargeImageURL('');
//     setLoading(false);
//     setModal(false);
//     setError(null);
//   };

//   const onToggleModal = () => {
//     setModal(showModal => !showModal);
//   };

//   const onOpenModal = webformatURL => {
//     setLargeImageURL(webformatURL);
//     setModal(true);
//   };

//   const onLoadMore = async () => {
//     setLoading(true);
//     setPage(prevPage => prevPage + 1);
//   };

/* ------------------------------------ */

class App extends Component {
  state = {
    images: [],
    query: '',
    largeImageURL: '',
    isLoading: false,
    showModal: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;
    imagesApiService.query = query;

    if (prevState.query !== query) {
      this.fetchImage();
    }
  }

  onSearchFormSubmit = newQuery => {
    this.setState({
      query: newQuery,
    });
  };

  onToggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onOpenModal = e => {
    this.setState({
      largeImageURL: this.state.images.find(
        url => url.webformatURL === e.target.src
      ).largeImageURL,
    });
  };

  fetchImage = async () => {
    this.setState({ isLoading: true });

    try {
      const images = await imagesApiService.fetchImg();
      this.setState({ images });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadMore = async () => {
    this.setState({ isLoading: true });

    try {
      const images = await imagesApiService.fetchImg();
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, isLoading, showModal, largeImageURL } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.onSearchFormSubmit} />

        {
          <ImageGallery
            images={images}
            onToggleModal={this.onToggleModal}
            onOpenModal={this.onOpenModal}
          />
        }

        {isLoading && <Loader />}

        {showModal && (
          <Modal onClose={this.onToggleModal} url={largeImageURL} />
        )}

        {images.length >= 12 && (
          <Button onLoadMore={this.onLoadMore} isLoading={isLoading} />
        )}

        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}

export default App;
