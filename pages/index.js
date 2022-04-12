import Head from "next/head";
import styles from "../styles/Home.module.css";
import CoinGecko from "coingecko-api";
import { Box, Typography, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import DataTable from "../components/Table";
import Pagination from "../components/Pagination";
import Carousel from "../components/Carousel";
import React from "react";

const coinGeckClient = new CoinGecko();

export default function Home(props) {
  const { data } = props.result;

  const [search, setSearch] = React.useState("");

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

export async function getServerSideProps() {
  const params = {
    order: CoinGecko.ORDER.MARKET_CAP_DESC,
  };
  const result = await coinGeckClient.coins.markets(params);
  return {
    props: {
      result,
    },
  };
}
