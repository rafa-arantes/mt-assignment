import { atom, useAtom } from 'jotai';

const LOCALSTORAGE_KEY = 'wishlist';

const wishlistAtom = atom(
  localStorage.getItem(LOCALSTORAGE_KEY)
    ? JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
    : {},
);

const addMovieAtom = atom(null, (get, set, wishlistItem) => {
  localStorage.setItem(
    LOCALSTORAGE_KEY,
    JSON.stringify({ ...get(wishlistAtom), [wishlistItem.id]: wishlistItem }),
  );
  set(wishlistAtom, { ...get(wishlistAtom), [wishlistItem.id]: wishlistItem });
});

const removeMovieAtom = atom(null, (get, set, wishlistItem) => {
  // Remove wishlistItem from object without mutating it
  // eslint-disable-next-line no-unused-vars
  const { [wishlistItem]: __, ...newWishlist } = get(wishlistAtom);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newWishlist));
  set(wishlistAtom, newWishlist);
});

const showWishlistAtom = atom(false, (get, set) => set(showWishlistAtom, !get(showWishlistAtom)));

const useWishlist = () => {
  const [wishlist] = useAtom(wishlistAtom);
  const [showWishlist, handleShowWishlist] = useAtom(showWishlistAtom);
  const [, addMovie] = useAtom(addMovieAtom);
  const [, removeMovie] = useAtom(removeMovieAtom);
  const isOnWishlist = (movieId) => !!wishlist[movieId];

  return {
    wishlist,
    addMovie,
    removeMovie,
    isOnWishlist,
    showWishlist,
    handleShowWishlist,
  };
};

export default useWishlist;
