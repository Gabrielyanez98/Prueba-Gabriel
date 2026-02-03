import PropTypes from 'prop-types';

const Image = ({ src, alt }) => {
  return (
    <div className="h-64 flex items-center justify-center mb-4 overflow-hidden rounded-lg bg-gray-50">
      <img
        src={src}
        alt={alt}
        className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Image;