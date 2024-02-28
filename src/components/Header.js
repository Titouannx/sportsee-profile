import React from 'react';
import '../styles/Header.css';
import logo from '../assets/logo.png'

function Header() {
  return (
    <header className="header">
        <img src={logo} alt="SportSee logo" className="header-logo" />
        <nav className="header-nav">
            <ul>
                <li><a href="accueil">Accueil</a></li>
                <li><a href="profil">Profil</a></li>
                <li><a href="réglage">Réglage</a></li>
                <li><a href="communauté">Communauté</a></li>
            </ul>
        </nav>
    </header>
  );
}

export default Header;
