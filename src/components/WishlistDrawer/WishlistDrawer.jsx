import React, { useCallback, useMemo } from 'react';

import useWishlist from 'hooks/useWishlist';

import './styles.scss';

function WishlistDrawer() {
  const {
    wishlist, removeMovie, showWishlist, handleShowWishlist,
  } = useWishlist();

  const wishlistArray = useMemo(() => Object.values(wishlist), [wishlist]);

  const handleRemoveFromWishlist = useCallback(
    (id) => () => removeMovie(id),
    [removeMovie],
  );

  return (
    showWishlist && (
      <section className="wishlist-drawer">
        <header className="wishlist-header">
          <h3>Wish List</h3>
          <button type="button" onClick={handleShowWishlist}>Close</button>
        </header>
        <div className="wishlist-list-wrapper">
          {wishlistArray.map((wishlistItem) => (
            <div className="wishlist-item" key={`wishlist_${wishlistItem.id}`}>
              <p>
                <b>{wishlistItem.title}</b>
              </p>
              <button
                type="button"
                className="button-remove-wishlist"
                onClick={handleRemoveFromWishlist(wishlist.id)}
              >
                -
              </button>
            </div>
          ))}
        </div>
      </section>
    )
  );
}

export default WishlistDrawer;
