import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Box, Typography, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import DataTable from "../components/Table";
import Pagination from "../components/Pagination";
import Carousel from "../components/Carousel";
import React from "react";
import CircularProgress from "../components/CircularProgress";

export default function Home() {
  const [data, setData] = React.useState([]);

  const [search, setSearch] = React.useState("");

  const fetchAssets = async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );

    const result = await response.json();

    setData(result);
  };

  React.useEffect(() => {
    fetchAssets();
  }, []);

  //THIS FILTERS THE LIST THAT IS DISPLAYED
  const allAssets = data.filter(
    (asset) =>
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    e.preventDefault();

    setSearch(e.target.value.toLowerCase());
  };

  if (data.length === 0) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto Tracker</title>
        <meta
          name="description"
          content="Track the prices of your favorite crypto asset"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar handleChange={handleChange} />
      <Container maxWidth="xl">
        <Carousel />
        <Box marginTop={3}>
          <Typography
            variant="h5"
            component="h1"
            fontWeight="bold"
            textAlign="center"
            color="white"
            marginBottom={2}
          >
            Cryptocurrency Prices By Market Cap
          </Typography>
          <DataTable data={allAssets} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
            marginBottom: "10rem",
          }}
        >
          <Pagination />
        </Box>
      </Container>
    </div>
  );
}
