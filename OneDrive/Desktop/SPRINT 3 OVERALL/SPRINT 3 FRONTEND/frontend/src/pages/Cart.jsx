import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cartCookie = Cookies.get('cart');
    if (!cartCookie) {
      setCartItems([]);
      setTotal(0);
      return;
    }

    const productIds = cartCookie.split(',').filter(Boolean);
    const uniqueIds = [...new Set(productIds)];

    Promise.all(
      uniqueIds.map((id) =>
        fetch(`${import.meta.env.VITE_APP_HOST}/products/${id}`)
          .then((res) => res.json())
          .then((data) => ({
            ...data.product,
            quantity: productIds.filter((pid) => pid === id).length,
          }))
      )
    )
      .then((products) => {
        setCartItems(products);
        const subtotal = products.reduce(
          (sum, item) => sum + parseFloat(item.cost) * item.quantity,
          0
        );
        setTotal(subtotal);
      })
      .catch((err) => console.error(err));
  };

  const removeItem = (productId) => {
    const cartCookie = Cookies.get('cart');
    if (cartCookie) {
      const items = cartCookie.split(',').filter(Boolean);
      const filtered = items.filter((id) => parseInt(id) !== productId);
      Cookies.set('cart', filtered.join(','));
      loadCart();
    }
  };

  const tax = total * 0.15;
  const grandTotal = total + tax;

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="container text-center">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="mt-4">
            {cartItems.map((item) => (
              <div className="card mb-3 shadow-sm" key={item.product_id}>
                <div className="row g-0 align-items-center">
                  <div className="col-md-3">
                    <img
                      src={`${import.meta.env.VITE_APP_HOST}/${item.image_filename}`}
                      alt={item.name}
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="col-md-9">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">Price: ${parseFloat(item.cost).toFixed(2)}</p>
                      <p className="card-text">Quantity: {item.quantity}</p>
                      <p className="card-text">
                        Total: ${(parseFloat(item.cost) * item.quantity).toFixed(2)}
                      </p>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeItem(item.product_id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-end mt-4">
              <p>Subtotal: ${total.toFixed(2)}</p>
              <p>Tax (15%): ${tax.toFixed(2)}</p>
              <p>
                <strong>Total: ${grandTotal.toFixed(2)}</strong>
              </p>
              <button className="btn btn-secondary me-2" onClick={() => navigate('/')}>
                Continue Shopping
              </button>
              <button className="btn btn-success" onClick={() => navigate('/checkout')}>
                Complete Purchase
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
