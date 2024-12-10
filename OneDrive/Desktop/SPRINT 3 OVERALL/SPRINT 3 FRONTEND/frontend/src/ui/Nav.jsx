import { Link } from 'react-router-dom';
import { BsCart } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function Nav({ isLoggedIn }) {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cartCookie = Cookies.get('cart');
    if (cartCookie) {
      const items = cartCookie.split(',').filter(Boolean);
      setCartCount(items.length);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          PixelCart
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {!isLoggedIn ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/logout">
                  Logout
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <BsCart /> {cartCount > 0 && <span>({cartCount})</span>}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
