import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './ui/Nav';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Nav isLoggedIn={isLoggedIn} />
      <Outlet context={setIsLoggedIn} />
    </>
  );
}

export default App;
