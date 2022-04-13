/* eslint-disable @next/next/no-img-element */
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Link from "next/link";
import CircularProgress from "../components/CircularProgress";

export default function Carousel() {
  const [trending, setTrending] = React.useState([]);

  const [btcPrice, setBtcPrice] = React.useState(null);

  const fetchTrendingAssets = async () => {
    const res = await fetch("https://api.coingecko.com/api/v3/search/trending");

    const data = await res.json();

    setTrending(data.coins);
  };

  const fetchBtcExchangeRate = async () => {
    const res = await fetch("https://api.coingecko.com/api/v3/exchange_rates");

    const data = await res.json();

    setBtcPrice(data.rates.usd.value);
  };

  React.useEffect(() => {
    fetchTrendingAssets();
    fetchBtcExchangeRate();
  }, []);

  if (trending.length === 0) {
    <CircularProgress />;
  }

  const coinConvertor = (assetBtcPrice) => {
    //when I add the select in the menu, add a condition here
    //to check what fiat currency is being used to display the numbers correctly

    let assetUsdPrice = assetBtcPrice * btcPrice;

    if (assetUsdPrice < 0.01) {
      return "$" + assetUsdPrice.toFixed(7);
    } else {
      return "$" + assetUsdPrice.toFixed(2);
    }
  };

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link href={`/assets/${coin.item.id}`} key={coin.item.id}>
        <a>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box display="flex">
              <img
                src={coin.item.small}
                width="50"
                height="50"
                alt={coin.item.name}
              />
              <Box display="flex" flexDirection="column">
                <Typography
                  variant="body2"
                  color="white"
                  marginLeft={0.75}
                  marginTop="auto"
                >
                  {coin.item.symbol}
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="h4"
              color="white"
              marginLeft={0.75}
              marginTop={0.5}
              marginBottom={1}
            >
              {coinConvertor(coin.item.price_btc)}
            </Typography>
          </Box>
        </a>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div>
      <Box marginTop={3}>
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1750}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          autoPlay
          items={items}
        />
      </Box>
    </div>
  );
}
