import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_HOST}/products/all`)
      .then((res) => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div key={product.product_id}>
          <img 
            src={`${import.meta.env.VITE_APP_HOST}/${product.image_filename}`}
            alt={product.name}
            style={{ width: '200px', height: '200px' }}
          />
          <h3>{product.name}</h3>
          <p>${product.cost}</p>
          <Link to={`/details/${product.product_id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;