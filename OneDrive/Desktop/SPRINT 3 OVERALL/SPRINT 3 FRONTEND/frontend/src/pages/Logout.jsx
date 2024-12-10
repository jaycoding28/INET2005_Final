import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();
  const setIsLoggedIn = useOutletContext();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_HOST}/users/logout`, {
      method: 'POST',
      credentials: 'include'
    })
    .then(res => {
      if (res.ok) {
        setIsLoggedIn(false);
      }
    })
    .catch(err => console.error(err));
  }, [setIsLoggedIn]);

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h2>You have been logged out successfully.</h2>
      <button onClick={() => navigate('/login')}>Login</button>
      <button onClick={() => navigate('/')}>Home</button>
    </div>
  );
}

export default Logout;
