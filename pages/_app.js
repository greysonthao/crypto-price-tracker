import "../styles/globals.css";
import CryptoContext from "../cryptoContext";
import Alert from "../components/Alert";
import Box from "@mui/material/Box";

export default function MyApp({ Component, pageProps }) {
  return (
    <CryptoContext>
      <Component {...pageProps} />
      <Box
        sx={{
          width: "100%",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Alert />
      </Box>
    </CryptoContext>
  );
}
