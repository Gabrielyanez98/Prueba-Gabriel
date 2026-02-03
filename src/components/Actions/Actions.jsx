import { useState } from 'react';
import PropTypes from 'prop-types';

const Actions = ({ options, onAddToCart, isAdding }) => {

  const [selectedStorage, setSelectedStorage] = useState(options.storages[0]?.code);
  const [selectedColor, setSelectedColor] = useState(options.colors[0]?.code);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddToCart(selectedColor, selectedStorage);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-6">
      <div className="grid grid-cols-2 gap-4">

        <div>
          <label htmlFor="storage-select" className="block text-xs font-bold text-gray-500 uppercase mb-2">Storage</label>
          <select
            id="storage-select"
            value={selectedStorage}
            onChange={(e) => setSelectedStorage(e.target.value)}
            className="w-full p-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {options.storages.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="color-select" className="block text-xs font-bold text-gray-500 uppercase mb-2">Color</label>
          <select
            id="color-select"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-full p-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {options.colors.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isAdding}
        className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-all ${isAdding ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg active:scale-95'
          }`}
      >
        {isAdding ? 'Adding to cart...' : 'Add to Cart'}
      </button>
    </form>
  );
};

Actions.propTypes = {
  options: PropTypes.object.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  isAdding: PropTypes.bool.isRequired,
};

export default Actions;