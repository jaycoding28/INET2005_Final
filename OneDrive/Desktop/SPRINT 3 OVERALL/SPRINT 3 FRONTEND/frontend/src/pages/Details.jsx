import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_HOST}/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.product))
      .catch((err) => console.error(err));
  }, [id]);

  const addToCart = () => {
    const cartCookie = Cookies.get('cart');
    const items = cartCookie ? cartCookie.split(',').filter(Boolean) : [];
    items.push(id);
    Cookies.set('cart', items.join(','));
    navigate('/cart');
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`${import.meta.env.VITE_APP_HOST}/${product.image_filename}`}
            alt={product.name}
            className="img-fluid rounded shadow-sm"
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p className="fs-4 fw-bold">${product.cost}</p>
          <button className="btn btn-success me-2" onClick={addToCart}>
            Add to Cart
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Details;
