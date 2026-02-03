import PropTypes from 'prop-types';

const Description = ({ product }) => {
 
  const SPEC_LABELS = {
    brand: 'Brand',
    model: 'Model',
    price: 'Price',
    cpu: 'CPU',
    ram: 'RAM',
    os: 'OS',
    displayResolution: 'Display Resolution',
    battery: 'Battery',
    primaryCamera: 'Cameras',
    dimentions: 'Dimensions',
    weight: 'Weight',
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Technical Specifications</h2>
      <dl className="grid grid-cols-1 gap-y-3">
        {Object.entries(SPEC_LABELS).map(([key, label]) => {
          let value = product[key];

          // Formateo específico para unidades
          if (key === 'price' && value) value = `${value}€`;
          if (key === 'weight' && value) value = `${value}g`;

          return (
            <div key={key} className="flex justify-between border-b border-gray-50 pb-1">
              <dt className="text-sm font-semibold text-gray-500 uppercase">{label}</dt>
              <dd className="text-sm text-gray-900 text-right">{value || 'N/A'}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
};

Description.propTypes = {
  product: PropTypes.shape({
    brand: PropTypes.string,
    model: PropTypes.string,
    price: PropTypes.string,
    cpu: PropTypes.string,
    ram: PropTypes.string,
    os: PropTypes.string,
    displayResolution: PropTypes.string,
    battery: PropTypes.string,
    primaryCamera: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    dimentions: PropTypes.string,
    weight: PropTypes.string,
  }).isRequired,
};

export default Description;