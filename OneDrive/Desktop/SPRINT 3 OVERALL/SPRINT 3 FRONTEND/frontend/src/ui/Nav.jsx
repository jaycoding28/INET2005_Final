import { Link } from 'react-router-dom'

function Nav() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
  )
}

export default Nav