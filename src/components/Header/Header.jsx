import React from 'react';
import { Link } from 'react-router-dom';

import useWishlist from 'hooks/useWishlist';

import './styles.scss';

function Header() {
  const { showWishlist, handleShowWishlist } = useWishlist();

  return (
    <header className="app-header">
      <Link to="/"><p>Home</p></Link>
      <button type="button" onClick={handleShowWishlist}>
        {showWishlist ? 'Hide ' : 'Show '}
        Wishlist
      </button>
    </header>
  );
}

export default Header;
