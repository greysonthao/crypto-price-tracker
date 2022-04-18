import React, { createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { onSnapshot, doc } from "firebase/firestore";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [watchlist, setWatchlist] = React.useState([]);
  const [alert, setAlert] = React.useState({
    open: false,
    message: "",
    type: "success",
  });

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null);
    });
  }, []);

  React.useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);

      let unsubscribe = onSnapshot(coinRef, (asset) => {
        if (asset.exists()) {
          setWatchlist(asset.data().assets);
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  return (
    <Crypto.Provider
      value={{
        alert,
        setAlert,
        user,
        watchlist,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
