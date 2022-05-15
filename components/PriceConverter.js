import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import changeIcon from "../images/change.png";

export default function PriceConverter({ coinData, formatDollar }) {
  const [assetQuantity, setAssetQuantity] = React.useState(1);
  const [assetPrice, setAssetPrice] = React.useState(0);
  const [cryptoOnTop, setCryptoOnTop] = React.useState(true);

  React.useEffect(() => {
    let realAssetPrice = coinData.market_data.current_price.usd * assetQuantity;

    if (realAssetPrice > 0.1) {
      setAssetPrice(formatDollar(realAssetPrice));
    } else {
      setAssetPrice(formatDollar(realAssetPrice, 7));
    }
  }, [assetQuantity, coinData.market_data.current_price.usd]);

  /*   React.useEffect(() => {
    setAssetQuantity(assetPrice / coinData.market_data.current_price.usd);
  }, [assetPrice, coinData.market_data.current_price.usd]); */

  const switchConversion = () => {
    setCryptoOnTop((prevState) => !prevState);
    console.log("cryptoOnTop: ", cryptoOnTop);
  };

  return (
    <>
      <Box sx={{ width: "85%", margin: "1rem" }}>
        <Paper sx={{ padding: "2rem 0 2.5rem 1rem" }}>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box display="flex" justifyContent="center">
                <Image
                  src={coinData.image.large}
                  alt={coinData.name}
                  width={25}
                  height={25}
                />
                <Typography sx={{ marginLeft: ".25rem" }}>
                  {coinData.symbol.toUpperCase()}
                </Typography>
              </Box>
              <TextField
                id="input-with-sx"
                variant="standard"
                type="number"
                value={assetQuantity}
                onChange={(e) => {
                  setAssetQuantity(e.target.value);
                }}
                sx={{
                  margin: "0 1.5rem 0 0",
                  /* backgroundColor: "#212121", */
                  width: "70%",
                }}
              />
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              margin=".5rem 0 .5rem 0"
            >
              <Image
                src={changeIcon.src}
                alt="convert"
                width={25}
                height={25}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box display="flex" justifyContent="center">
                <MonetizationOnIcon
                  fontSize="medium"
                  sx={{ marginRight: ".15rem" }}
                />
                <Typography>USD</Typography>
              </Box>
              <TextField
                id="input-with-sx"
                variant="standard"
                /* type="number" */

                value={assetPrice}
                sx={{
                  margin: "0 1.5rem 0 0",
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
