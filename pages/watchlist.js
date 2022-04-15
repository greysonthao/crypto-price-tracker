import Head from "next/head";
import { Box, Typography, Container, Paper, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import DataTable from "../components/Table";
import React from "react";
import CircularProgress from "../components/CircularProgress";

export default function watchlist() {
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
          >
            Watchlist
          </Typography>

          {/*  <DataTable data={allAssets} /> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
            marginBottom: "10rem",
          }}
        ></Box>
      </Container>
    </div>
  );
}
