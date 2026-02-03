import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from '../Image/Image';

const Item = ({ id, imgUrl, brand, model, price }) => {
  return (
    <Link 
      to={`/product/${id}`} 
      className="group bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 p-6 transition-all hover:-translate-y-1"
    >
      <Image src={imgUrl} alt={`${brand} ${model}`} />
      <div className="space-y-1">
        <h3 className="text-xs font-bold text-blue-600 uppercase tracking-tighter">{brand}</h3>
        <p className="text-lg font-semibold text-gray-800 leading-tight">{model}</p>
        <p className="text-xl font-medium text-gray-900">
          {price ? `${price}€` : <span className="text-gray-400 text-sm italic font-normal">N/A</span>}
        </p>
      </div>
    </Link>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  price: PropTypes.string,
};

export default Item;