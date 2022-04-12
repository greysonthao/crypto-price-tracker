import React from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Image from "next/image";
import Card from "@mui/material/Card";

export default function Details() {
  const {
    query: { id },
  } = useRouter();

  const [coinData, setCoinData] = React.useState(null);

  React.useEffect(() => {
    async function getCoinData() {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
      setCoinData(await res.json());
    }
    if (id) {
      getCoinData();
    }
  }, []);

  if (!coinData) {
    return <div>Loading...</div>;
  }

  const formatDollar = (number, maximumSignificantDigits) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "usd",
      maximumSignificantDigits,
    }).format(number);

  return (
    <div>
      <Head>
        <title>{coinData.name}</title>
        <meta
          name="description"
          content="Track the prices of your favorite crypto asset"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Container maxWidth="xl">
        <Box
          display="flex"
          alignItems="center"
          sx={{
            marginTop: 3,
          }}
        >
          <Image
            src={coinData.image.large}
            alt={coinData.name}
            width={55}
            height={55}
          />
          <Typography
            variant="h4"
            components="h1"
            color="white"
            marginLeft={1.5}
          >
            {coinData.name}
          </Typography>
          <Card
            sx={{
              marginLeft: 2,
              padding: 0.4,
            }}
          >
            <Typography variant="h6" components="h2">
              ({coinData.symbol.toUpperCase()})
            </Typography>
          </Card>
        </Box>
        <Box>
          <Typography
            variant="h3"
            components="h1"
            color="white"
            paddingLeft="3rem"
          >
            {formatDollar(coinData.market_data.current_price.usd)}
          </Typography>
        </Box>
      </Container>
    </div>
  );
}

/* export async function getServerSideProps(context) {
  const params = {
    order: CoinGecko.ORDER.MARKET_CAP_DESC,
  };
  const result = await coinGeckClient.coins.markets(params);
  return {
    props: {
      result,
    },
  };
} */
