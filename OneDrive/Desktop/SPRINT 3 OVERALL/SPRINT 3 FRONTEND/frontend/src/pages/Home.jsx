import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_HOST}/products/all`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="container mt-5">
      {}
      <header className="text-center mb-5">
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: '700',
            letterSpacing: '2px',
            color: '#007bff',
            textTransform: 'uppercase',
          }}
        >
          PixelCart
        </h1>
      </header>

      {}
      <h2
        className="text-center mb-4"
        style={{ fontSize: '2rem', fontWeight: '600', color: '#343a40' }}
      >
        Products
      </h2>
      <div className="row g-4">
        {products.map((product) => (
          <div key={product.product_id} className="col-md-4 col-lg-3">
            <div className="card shadow-sm h-100">
              <img
                src={`${import.meta.env.VITE_APP_HOST}/${product.image_filename}`}
                alt={product.name}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${parseFloat(product.cost).toFixed(2)}</p>
                <Link to={`/details/${product.product_id}`} className="btn btn-primary mt-auto">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
