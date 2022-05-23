import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ onClose, url }) => {
  useEffect(() => {
    // вешает слушатели (didmount)
    window.addEventListener('keydown', closeModal);

    // убирает слушатели (willunmount)
    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  });

  // 'Escape' закрывает модалку
  const closeModal = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  // смотрит за бекдропом и закривает модалку
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <img src={url} alt="" width={800} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

/* -------------------------------------------- */

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.closeModal);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.closeModal);
//   }

//   closeModal = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={s.overlay} onClick={this.handleBackdropClick}>
//         <div className={s.modal}>
//           <img src={this.props.url} alt="" width={800} />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }
