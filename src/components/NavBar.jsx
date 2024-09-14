import React from 'react';
import sun from '../assets/images/icon-sun.svg'
import moon from '../assets/images/icon-moon.svg'
import './components.css'
import { connect } from 'react-redux';

function Navbar({ theme, title, toggleTheme}) {
  const getImage = theme === 'dark' ? sun : moon;

  return (
    <nav className="Navbar">
      <h1 className='h1'>{title}</h1>
      <button onClick={toggleTheme}><img src={getImage} alt="sun" /></button>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  theme: state.theme
})

export default connect(mapStateToProps, {})(Navbar);
