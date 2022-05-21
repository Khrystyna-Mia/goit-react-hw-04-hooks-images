import RingLoader from 'react-spinners/RingLoader';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.loader}>
      <RingLoader size={100} color="purple" />
    </div>
  );
};

export default Loader;
