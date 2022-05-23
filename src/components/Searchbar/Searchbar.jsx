import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import s from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  // сетим просто значение(строка)
  const handleChange = e => {
    setInputValue(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      toast.warn('Enter the name of the picture, photo', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    // вызывает onSubmit prop и передаем inputValue
    onSubmit(inputValue);
    // сбрасывает после сабмита форми значение в пустую строку
    setInputValue('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button type="submit" className={s.button}>
          <FaSearch size={30} fill="purple" />
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;

/* --------------------------------------------------- */

// class Searchbar extends Component {
//   state = {
//     inputValue: '',
//   };

//   handleChange = e => {
//     this.setState({ inputValue: e.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     if (this.state.inputValue.trim() === '') {
//       toast.warn('Enter the name of the picture, photo', {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//       return;
//     }

//     this.props.onSubmit(this.state.inputValue);
//     this.setState({ inputValue: '' });
//   };

//   render() {
//     return (
//       <header className={s.searchbar}>
//         <form className={s.form} onSubmit={this.handleSubmit}>
//           <button type="submit" className={s.button}>
//             <FaSearch size={30} fill="purple" />
//           </button>

//           <input
//             className={s.input}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.inputValue}
//             onChange={this.handleChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }
