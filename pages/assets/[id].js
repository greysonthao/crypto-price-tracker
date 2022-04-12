import React from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Image from "next/image";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Chart from "../../components/Chart";
import parse from "html-react-parser";

export default function Details() {
  const {
    query: { id },
  } = useRouter();

  const [coinData, setCoinData] = React.useState(null);

  async function getCoinData() {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
    setCoinData(await res.json());
  }

  React.useEffect(() => {
    if (id) {
      getCoinData();
      console.log(coinData);
    }
  }, []);

  const formatDollar = (number, maximumSignificantDigits) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "usd",
      maximumSignificantDigits,
    }).format(number);

  if (!coinData) {
    return (
      <div>
        <Box>
          <Typography variant="h1" color="white">
            Loading...
          </Typography>
        </Box>
      </div>
    );
  }

  /* let coinDescription = coinData.description.en.split(". ", 1); */

  let coinDescription = coinData.description.en;

  coinDescription = parse(String(coinDescription));

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
        <Grid container>
          <Grid item sx={12} sm={4}>
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
            <Box display="flex">
              <Typography
                variant="h3"
                components="h3"
                color="white"
                paddingLeft={1.25}
              >
                {formatDollar(coinData.market_data.current_price.usd)}
              </Typography>
              <Typography
                variant="h6"
                components="p"
                color="white"
                marginLeft={1.25}
                marginTop=".75rem"
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
                variant="body1"
                components="p"
                color="white"
                marginTop={3}
                textAlign="justify"
              >
                {coinDescription}.
              </Typography>
            </Box>
          </Grid>
          <Grid item sx={12} sm={8} marginTop={3}>
            <Chart />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
