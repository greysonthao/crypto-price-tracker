import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import changeIcon from "../images/change.png";

export default function PriceConverter({ coinData }) {
  const [assetQuantity, setAssetQuantity] = React.useState(1);
  const [assetPrice, setAssetPrice] = React.useState(0);
  const [cryptoOnTop, setCryptoOnTop] = React.useState(true);

  React.useEffect(() => {
    setAssetPrice(coinData.market_data.current_price.usd * assetQuantity);
  }, [assetQuantity, coinData.market_data.current_price.usd]);

  const switchConversion = () => {
    setCryptoOnTop((prevState) => !prevState);
    console.log("cryptoOnTop: ", cryptoOnTop);
  };

  return (
    <>
      <Box sx={{ width: "85%", margin: "1rem" }}>
        <Paper sx={{ padding: "1rem 0 1.5rem 1rem" }}>
          <Box>
            {/* <Box sx={{ display: "flex", alignItems: "flex-end" }}> */}
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              {/* <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} /> */}
              <Image
                src={coinData.image.large}
                alt={coinData.name}
                width={25}
                height={25}
              />
              <Typography>{coinData.symbol.toUpperCase()}</Typography>
              <TextField
                id="input-with-sx"
                variant="standard"
                type="number"
                value={assetQuantity}
                onChange={(e) => {
                  setAssetQuantity(e.target.value);
                }}
                sx={{
                  marginLeft: "1rem",
                  /* backgroundColor: "#212121", */
                  width: "70%",
                }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              onClick={switchConversion}
              sx={{ cursor: "pointer" }}
            >
              <Image
                src={changeIcon.src}
                alt="convert"
                width={25}
                height={25}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <MonetizationOnIcon sx={{ marginRight: ".15rem" }} />
              <Typography>USD</Typography>
              <TextField
                id="input-with-sx"
                variant="standard"
                type="number"
                value={assetPrice}
                sx={{
                  marginLeft: ".8rem",
                  /* backgroundColor: "#212121", */
                  width: "70%",
                }}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
