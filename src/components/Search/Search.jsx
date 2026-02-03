import PropTypes from 'prop-types';

const Search = ({ value, onChange }) => {
  return (
    <div className="flex justify-end mb-8">
      <div className="relative w-full max-w-xs">
        <input
          type="text"
          placeholder="Search brand or model..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
        <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
      </div>
    </div>
  );
};

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Search;