import Head from "next/head";
import { Box, Typography, Container, Paper, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import DataTable from "../components/Table";
import React from "react";
import CircularProgress from "../components/CircularProgress";
import { CryptoState } from "../cryptoContext";

export default function Watchlist() {
  const { watchlist } = CryptoState();

  const [watchlistData, setWatchlistData] = React.useState([]);

  React.useEffect(() => {
    if (watchlist.length === 0) {
      return;
    }

    fetchWatchlistDada();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchlist]);

  const fetchWatchlistDada = async () => {
    let csvString = "";
    for (let i = 0; i < watchlist.length; i++) {
      csvString += String(watchlist[i]);
      csvString += "%2C";
    }

    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${csvString}&order=market_cap_desc&per_page=20&page=1&sparkline=false`
    );

    const result = await response.json();

    setWatchlistData(result);
  };

  return (
    <div>
      <Head>
        <title>Astral: Watchlist</title>
        <meta
          name="description"
          content="Track the prices of your favorite crypto assets."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar /* handleChange={handleChange} */ />
      <Container maxWidth="xl">
        <Box marginTop={3}>
          <Typography
            variant="h5"
            component="h1"
            fontWeight="bold"
            textAlign="center"
            color="white"
            marginBottom="1rem"
          >
            Watchlist
          </Typography>

          <DataTable data={watchlistData} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
            marginBottom: "10rem",
          }}
        >
          {watchlistData.length === 0 && (
            <Typography
              variant="h6"
              component="h4"
              fontWeight="bold"
              color="white"
            >
              Your list is empty.
            </Typography>
          )}
        </Box>
      </Container>
    </div>
  );
}
