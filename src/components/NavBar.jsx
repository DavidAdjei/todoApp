import React from 'react';
import sun from '../assets/images/icon-sun.svg'
import moon from '../assets/images/icon-moon.svg'
import './components.css'
import { useTheme } from '../theme/theme';

function Navbar({ title, toggleTheme}) {
  const [theme] = useTheme(); 
  const getImage = theme === 'dark' ? sun : moon;
  

  return (
    <nav className="Navbar">
      <h1>{title}</h1>
      <button onClick={toggleTheme}><img src={getImage} alt="sun" /></button>
    </nav>
  );
}

export default Navbar;
