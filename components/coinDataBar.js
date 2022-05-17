import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

export default function coinDataBar({ coinData }) {
  return (
    <>
      <Grid container sx={{ margin: "4rem 0 0 0" }}>
        <Grid item xs={12} sm={2}>
          <Paper
            square={true}
            sx={{
              backgroundColor: "black",
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
              padding: ".5rem",
            }}
          >
            <Typography
              variant="body2"
              fontSize=".75rem"
              textAlign="center"
              color="white"
            >
              RANK
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              color="white"
              fontWeight="bold"
            >
              #{coinData.market_cap_rank}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Paper
            square={true}
            sx={{ backgroundColor: "black", padding: ".5rem" }}
          >
            <Typography
              variant="body2"
              fontSize=".75rem"
              textAlign="center"
              color="white"
            >
              MARKET CAP (24H)
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              color="white"
              fontWeight="bold"
            >
              ${coinData.market_data.market_cap.usd.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Paper
            square={true}
            sx={{
              backgroundColor: "black",
              padding: ".5rem",
            }}
          >
            <Typography
              variant="body2"
              fontSize=".75rem"
              textAlign="center"
              color="white"
            >
              24H TRADING VOL
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              color="white"
              fontWeight="bold"
            >
              ${coinData.market_data.total_volume.usd.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Paper
            square={true}
            sx={{
              backgroundColor: "black",
              padding: ".5rem",
            }}
          >
            <Typography
              variant="body2"
              fontSize=".75rem"
              textAlign="center"
              color="white"
            >
              FULLY DILUTED VAL
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              color="white"
              fontWeight="bold"
            >
              {Object.keys(coinData.market_data.fully_diluted_valuation)
                .length === 0
                ? "N/A"
                : "$" +
                  coinData.market_data.fully_diluted_valuation.usd.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Paper
            square={true}
            sx={{ backgroundColor: "black", padding: ".5rem" }}
          >
            <Typography
              variant="body2"
              fontSize=".75rem"
              textAlign="center"
              color="white"
            >
              CIRCULATING SUPPLY
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              color="white"
              fontWeight="bold"
            >
              {coinData.market_data.circulating_supply.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Paper
            square={true}
            sx={{
              backgroundColor: "black",
              borderBottomLeftRadius: "5px",
              borderBottomRightRadius: "5px",
              padding: ".5rem",
            }}
          >
            <Typography
              variant="body2"
              fontSize=".75rem"
              textAlign="center"
              color="white"
            >
              TOTAL SUPPLY
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              color="white"
              fontWeight="bold"
            >
              {coinData.market_data.total_supply
                ? coinData.market_data.total_supply.toLocaleString()
                : "N/A"}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
/* export default function coinDataBar({ coinData }) {
  return (
    <>
      <Paper
        sx={{
          backgroundColor: "black",
          padding: "1rem 1rem 1rem 1rem",
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" flexDirection="column">
            <Typography
              variant="caption"
              textAlign="center"
              color="white"
              paddingLeft="2rem"
            >
              Rank
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              color="white"
              paddingLeft="2rem"
            >
              #{coinData.market_cap_rank}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="caption" textAlign="center" color="white">
              24 Hr Trading Volume
            </Typography>
            <Typography variant="body1" textAlign="center" color="white">
              ${coinData.market_data.total_volume.usd.toLocaleString()}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="caption" textAlign="center" color="white">
              Market Cap
            </Typography>
            <Typography variant="body1" textAlign="center" color="white">
              ${coinData.market_data.market_cap.usd.toLocaleString()}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="caption" textAlign="center" color="white">
              Circulating Supply
            </Typography>
            <Typography variant="body1" textAlign="center" color="white">
              {coinData.market_data.circulating_supply.toLocaleString()}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography
              variant="caption"
              textAlign="center"
              color="white"
              paddingRight="2rem"
            >
              Total Supply
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              color="white"
              paddingRight="2rem"
            >
              {coinData.market_data.total_supply
                ? coinData.market_data.total_supply.toLocaleString()
                : "N/A"}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </>
  );
}
 */
