import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

function Checkout() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_HOST}/users/getSession`, {
      credentials: 'include'
    })
    .then(res => {
      if (res.status === 200) return res.json();
      throw new Error('Not logged in');
    })
    .then(() => setIsLoggedIn(true))
    .catch(() => setIsLoggedIn(false));
  }, []);

  const onSubmit = async (data) => {
    const cart = Cookies.get('cart');
    if (!cart) {
      alert('Your cart is empty');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_HOST}/products/purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...data,
          cart
        })
      });

      if (response.ok) {
        Cookies.remove('cart');
        navigate('/confirmation');
      } else {
        alert('Purchase failed');
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  if (isLoggedIn === null) return <p>Loading...</p>;

  if (!isLoggedIn) {
    return (
      <div style={{ padding: '20px' }}>
        <p>You must be logged in to proceed to checkout.</p>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Shipping Information</h3>
        <div>
          <input {...register('street', { required: true })} placeholder="Street" />
        </div>
        <div>
          <input {...register('city', { required: true })} placeholder="City" />
        </div>
        <div>
          <input {...register('province', { required: true })} placeholder="Province" />
        </div>
        <div>
          <input {...register('country', { required: true })} placeholder="Country" />
        </div>
        <div>
          <input {...register('postal_code', { required: true })} placeholder="Postal Code" />
        </div>

        <h3>Payment Information</h3>
        <div>
          <input {...register('credit_card', { required: true })} placeholder="Credit Card Number" />
        </div>
        <div>
          <input {...register('credit_expire', { required: true })} placeholder="Expiry Date" />
        </div>
        <div>
          <input {...register('credit_cvv', { required: true })} placeholder="CVV" />
        </div>

        <button type="submit">Complete Purchase</button>
      </form>
    </div>
  );
}

export default Checkout;
