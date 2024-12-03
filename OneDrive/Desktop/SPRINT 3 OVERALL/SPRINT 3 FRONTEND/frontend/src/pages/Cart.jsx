import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cartCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('cart='));

    if (!cartCookie) {
      setCartItems([]);
      return;
    }

    const productIds = cartCookie.split('=')[1].split(',').filter(id => id);
    if (productIds.length === 0) {
      setCartItems([]);
      return;
    }

    const uniqueIds = [...new Set(productIds)];

    Promise.all(
      uniqueIds.map(id =>
        fetch(`${import.meta.env.VITE_APP_HOST}/products/${id}`)
          .then(res => res.json())
          .then(data => {
            if (!data.product) return null;
            return {
              ...data.product,
              quantity: productIds.filter(pid => pid === id).length
            };
          })
      )
    ).then(products => {
      const validProducts = products.filter(p => p !== null);
      setCartItems(validProducts);
      const subtotal = validProducts.reduce((sum, item) => 
        sum + (Number(item.cost) * item.quantity), 0
      );
      setTotal(subtotal);
    });
  }, []);

  if (cartItems.length === 0) {
    return (
      <div>
        <h2>Your Cart</h2>
        <p>Your cart is empty</p>
        <button onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.map(item => (
        <div key={item.product_id}>
          {item.name && (  
            <>
              <img 
                src={`${import.meta.env.VITE_APP_HOST}/${item.image_filename}`}
                alt={item.name}
                style={{ width: '100px', height: '100px' }}
              />
              <h3>{item.name}</h3>
              <p>Price: ${item.cost}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${(Number(item.cost) * item.quantity).toFixed(2)}</p>
            </>
          )}
        </div>
      ))}
      <h3>Subtotal: ${total.toFixed(2)}</h3>
      <button onClick={() => navigate('/')}>Continue Shopping</button>
      <button onClick={() => navigate('/checkout')}>Complete Purchase</button>
    </div>
  );
}

export default Cart;