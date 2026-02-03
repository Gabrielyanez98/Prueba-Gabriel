import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';

function App() {

  const cartCount = 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cartCount} />
      <main className="container mx-auto">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;