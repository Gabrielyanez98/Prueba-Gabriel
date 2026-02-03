import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-extrabold text-blue-700 tracking-tighter">
          ITX-Store
        </Link>

        <nav className="hidden md:flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const displayName = name === 'product' ? 'Product' : name;

            return (
              <span key={name} className="flex items-center">
                <span className="mx-2">/</span>
                {isLast ? (
                  <span className="text-gray-900 font-semibold uppercase">{displayName}</span>
                ) : (
                  <Link to={routeTo} className="hover:text-blue-600 transition-colors capitalize">
                    {displayName}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
          <span className="text-xl">🛒</span>
          <span className="font-bold text-blue-700">0</span>
        </div>
      </div>
    </header>
  );
};

export default Header;