import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import CoinGecko from "coingecko-api";
import { Box, Typography, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import DataTable from "../components/Table";
import Pagination from "../components/Pagination";

const coinGeckClient = new CoinGecko();

export default function Home(props) {
  const { data } = props.result;

  console.log(data);

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
      <Navbar />
      <Container maxWidth="xl">
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
          <DataTable data={data} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 3,
          }}
        >
          <Pagination />
        </Box>
      </Container>
    </div>
  );
}

export async function getServerSideProps(context) {
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
