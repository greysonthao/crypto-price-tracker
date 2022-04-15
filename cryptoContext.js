import React, { createContext, useContext } from "react";
/* import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { onSnapshot, doc } from "firebase/firestore"; */

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  /*   const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹"); */
  const [alert, setAlert] = React.useState({
    open: false,
    message: "",
    type: "success",
  });

  const [user, setUser] = React.useState(null);
  const [watchlist, setWatchlist] = React.useState([]);

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
