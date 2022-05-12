import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export default function coinDataBar({ coinData }) {
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
              {coinData.market_data.total_supply.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </>
  );
}
