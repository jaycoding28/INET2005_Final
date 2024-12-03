import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_HOST}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product);
      });
  }, [id]);

  const addToCart = () => {
    const cartCookie = document.cookie.includes('cart=') 
      ? document.cookie.split('cart=')[1].split(';')[0].split(',')
      : [];
    cartCookie.push(id);
    document.cookie = `cart=${cartCookie.join(',')}`;
    navigate('/cart');
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <img
        src={`${import.meta.env.VITE_APP_HOST}/${product.image_filename}`}
        alt={product.name}
        style={{ width: "300px", height: "300px" }}
      />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.cost}</p>
      <button onClick={addToCart}>Add to Cart</button>
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
}

export default Details;