import Head from "next/head";
import { Box, Typography, Container, Paper, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import DataTable from "../components/Table";
import Pagination from "../components/Pagination";
import Carousel from "../components/Carousel";
import React from "react";
import CircularProgress from "../components/CircularProgress";
import { useRouter } from "next/router";

export default function Home() {
  const [data, setData] = React.useState([]);
  const [marketCapData, setMarketCapData] = React.useState([]);
  const [pageNum, setPageNum] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [numPerPage, setNumPerPage] = React.useState(20);
  const [user, setUser] = React.useState(null);
  const router = useRouter();

  const fetchAssets = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${numPerPage}&page=${pageNum}&sparkline=false`
    );

    const result = await response.json();

    setData(result);
  };

  const fetchMarketData = async () => {
    const response = await fetch("https://api.coingecko.com/api/v3/global");

    const result = await response.json();

    setMarketCapData(result);
  };

  React.useEffect(() => {
    if (router.query.page) {
      setPageNum(parseInt(router.query.page));
    }
  }, [router.query.page]);

  React.useEffect(() => {
    fetchMarketData();
  }, []);

  React.useEffect(() => {
    fetchAssets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);

  //THIS FILTERS THE LIST THAT IS DISPLAYED
  /*  const allAssets = data.filter(
    (asset) =>
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(search.toLowerCase())
  ); */

  const handleChange = (e) => {
    e.preventDefault();

    setSearch(e.target.value.toLowerCase());
  };

  const styles = {
    backgroundColor: "black",
    color: "white",
    padding: 1.5,
    borderRadius: 3,
  };

  const formatDollar = (number, maximumSignificantDigits) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "usd",
      maximumSignificantDigits,
    }).format(number);

  function handlePageChange(event, value) {
    setPageNum(value);
    if (value === 1) {
      router.push(`/`, undefined, { shallow: true });
    } else {
      router.push(`?page=${value}`, undefined, { shallow: true });
    }
  }

  const resetPageNum = () => {
    setPageNum(1);
    /* router.reload(); */
  };

  if (data.length === 0 || marketCapData.length === 0) {
    return (
      <Box display="flex" justifyContent="center" marginTop="1rem" size="200">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Head>
        <title>Astral: Crypocurrency Prices</title>
        <meta
          name="description"
          content="Track the prices of your favorite crypto assets."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar handleChange={handleChange} resetPageNum={resetPageNum} />
      <Container maxWidth="xl">
        {/* <Carousel /> */}
        <Box marginTop="5rem">
          <Typography
            variant="h5"
            component="h1"
            fontWeight="bold"
            textAlign="center"
            color="white"
          >
            Cryptocurrency Prices By Market Cap
          </Typography>
          <Typography
            variant="body1"
            component="p"
            color="white"
            marginBottom="2rem"
            textAlign="center"
          >
            The global cryptocurrency market cap today is{" "}
            {formatDollar(marketCapData.data.total_market_cap.usd)}, a{" "}
            <Box
              component="span"
              sx={{
                color:
                  marketCapData.data.market_cap_change_percentage_24h_usd > 0
                    ? "green"
                    : "red",
              }}
            >
              {marketCapData.data.market_cap_change_percentage_24h_usd.toFixed(
                2
              )}
              %
              <Box component="span">
                {marketCapData.data.market_cap_change_percentage_24h_usd > 0
                  ? " ⬆"
                  : " ⬇"}
              </Box>
            </Box>{" "}
            change in the last 24 hours.
          </Typography>
          <Box display="flex" justifyContent="center" marginBottom={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <Paper sx={styles}>
                  <Typography variant="h5">
                    $
                    {Math.ceil(
                      marketCapData.data.total_market_cap.usd
                    ).toLocaleString("en-US")}
                  </Typography>
                  <Typography>Market Capitalization</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Paper sx={styles}>
                  <Typography variant="h5">
                    $
                    {Math.ceil(
                      marketCapData.data.total_volume.usd
                    ).toLocaleString("en-US")}
                  </Typography>
                  <Typography>24 Hr Trading Volume</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Paper sx={styles}>
                  <Typography variant="h5">
                    {marketCapData.data.market_cap_percentage.btc.toFixed(2)}%
                  </Typography>
                  <Typography>BTC Dominance</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Paper sx={styles}>
                  <Typography variant="h5">
                    {marketCapData.data.active_cryptocurrencies}
                  </Typography>
                  <Typography># of Coins</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
          <DataTable data={data} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
            marginBottom: "10rem",
          }}
        >
          <Pagination
            count={Math.ceil(
              marketCapData.data.active_cryptocurrencies / numPerPage
            )}
            page={pageNum}
            handlePageChange={handlePageChange}
          />
        </Box>
      </Container>
    </div>
  );
}
