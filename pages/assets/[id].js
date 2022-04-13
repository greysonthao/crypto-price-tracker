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
import CircularProgress from "../../components/CircularProgress";

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
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  const coinDescriptionShortener = () => {
    let coinDescription = coinData.description.en;

    coinDescription = coinDescription.split(". ", 1);

    coinDescription = String(coinDescription).replace(/(<([^>]+)>)/gi, "");

    return coinDescription + ".";
  };

  let totalMarketCap = formatDollar(coinData.market_data.market_cap.usd);

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
          <Grid item xs={12} sm={4}>
            <Box display="flex" justifyContent="center" marginTop="1.5rem">
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
                {formatDollar(coinData.market_data.current_price.usd)}
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
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} marginTop="1.5rem">
            <Chart coin={coinData.id} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
