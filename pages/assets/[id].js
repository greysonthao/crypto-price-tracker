import React from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
//import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Image from "next/image";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Chart from "../../components/Chart";
import CircularProgress from "../../components/CircularProgress";
import Button from "@mui/material/Button";
import { CryptoState } from "../../cryptoContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function Details({ coinData }) {
  if (!coinData) {
    return (
      <Box>
        <Navbar />
        <Box display="flex" justifyContent="center" marginTop="3rem">
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  const { user, watchlist, setAlert } = CryptoState();

  const inWatchlist = watchlist.includes(coinData?.id);

  const formatDollar = (number, maximumSignificantDigits) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "usd",
      maximumSignificantDigits,
    }).format(number);

  const coinDescriptionShortener = () => {
    let coinDescription = coinData.description.en;

    coinDescription = coinDescription.split(". ", 1);

    coinDescription = String(coinDescription).replace(/(<([^>]+)>)/gi, "");

    return coinDescription + ".";
  };

  let totalMarketCap = formatDollar(coinData.market_data.market_cap.usd);

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef,
        {
          assets: watchlist ? [...watchlist, coinData?.id] : [coinData?.id],
        },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coinData.name} has been added to the watchlist`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef,
        {
          assets: watchlist.filter((watch) => watch !== coinData?.id),
        },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coinData.name} has been removed from the watchlist`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <div>
      <Head>
        <title>Astral: {coinData.name} Price</title>
        <meta
          name="description"
          content="Track the prices of your favorite crypto assets"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12} sm={4}>
            <Box display="flex" justifyContent="center" marginTop="4.5rem">
              <Image
                src={coinData.image.large}
                alt={coinData.name}
                width={100}
                height={100}
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginTop=".5rem"
            >
              <Typography
                variant="h4"
                components="h1"
                fontWeight="bold"
                color="white"
              >
                {coinData.name}
              </Typography>
              <Card
                sx={{
                  marginLeft: "1rem",
                  paddingLeft: 0.5,
                  paddingRight: 0.5,
                }}
              >
                <Typography variant="h6" components="h2">
                  {coinData.symbol.toUpperCase()}
                </Typography>
              </Card>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginTop=".1rem"
            >
              <Typography
                variant="h2"
                fontWeight="bold"
                components="h3"
                color="white"
              >
                {coinData.market_data.current_price.usd > 0.1
                  ? formatDollar(coinData.market_data.current_price.usd)
                  : formatDollar(coinData.market_data.current_price.usd, 7)}
              </Typography>
              <Typography
                variant="h6"
                components="p"
                color="white"
                fontWeight="bold"
                marginLeft=".75rem"
                sx={{
                  color: "white",
                  ...(coinData.market_data.price_change_percentage_24h > 0 && {
                    color: "green",
                  }),
                  ...(coinData.market_data.price_change_percentage_24h < 0 && {
                    color: "red",
                  }),
                }}
              >
                {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h6"
                components="p"
                color="white"
                fontWeight="bold"
                textAlign="center"
                marginTop=".2rem"
              >
                Ranking:{" "}
                <Box component="span" fontWeight="normal">
                  #{coinData.market_cap_rank}
                </Box>
              </Typography>
              <Typography
                variant="h6"
                components="p"
                color="white"
                fontWeight="bold"
                textAlign="center"
              >
                Market Cap:{" "}
                <Box component="span" fontWeight="normal">
                  {totalMarketCap}
                </Box>
              </Typography>
              <Typography
                variant="body1"
                components="p"
                color="white"
                marginTop="1rem"
                textAlign="justify"
              >
                {coinDescriptionShortener()}
              </Typography>
              <Typography
                variant="body2"
                components="p"
                color="white"
                marginTop="1.25rem"
                textAlign="center"
              >
                website:{" "}
                <a
                  target="_blank"
                  href={coinData.links.homepage[0]}
                  rel="noopener noreferrer"
                >
                  {coinData.links.homepage[0]}
                </a>
              </Typography>
              {user && (
                <Box display="flex" justifyContent="center" marginTop="1.5rem">
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                      color: "white",
                      border: "3px white solid",
                    }}
                    onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
                  >
                    {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} marginTop="4.5rem">
            <Chart coin={coinData.id} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;

  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
  const coinData = await res.json();

  if (!coinData) {
    return {
      notFound: true,
    };
  }

  return {
    props: { coinData },
  };
}
