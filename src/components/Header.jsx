import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaShoppingCart } from 'react-icons/fa';

const Header = ({ cartCount }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-10">
      <Link to="/" className="text-xl font-bold text-blue-600">
        Mobile Store
      </Link>
      
      <nav className="text-sm text-gray-500">
        Home / Product
      </nav>

      <div className="flex items-center gap-2">
        <FaShoppingCart className="h-6 w-6 text-gray-700" />
        <span className="bg-red-500 text-white rounded-full px-2 text-sm font-bold">
          {cartCount}
        </span>
      </div>
    </header>
  );
};

Header.propTypes = {
  cartCount: PropTypes.number.isRequired,
};

export default Header;