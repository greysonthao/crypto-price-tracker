/* eslint-disable @next/next/no-img-element */
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Link from "next/link";

export default function CryptoAutocomplete() {
  const [assets, setAssets] = React.useState([]);

  const fetchAssetData = async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
    );

    const result = await response.json();

    setAssets(result);
  };

  React.useEffect(() => {
    fetchAssetData();
  }, []);

  const formatDollar = (number, maximumSignificantDigits) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "usd",
      maximumSignificantDigits,
    }).format(number);

  return (
    <Autocomplete
      id="crypto-select"
      options={assets}
      autoHighlight
      sx={{
        width: 275,
        height: 40,
        backgroundColor: "white",
        borderRadius: 3,
      }}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Link
          href={`/assets/${option.id}`}
          underline="none"
          textDecoration="none"
          key={option.name}
        >
          <a>
            <Box
              component="li"
              sx={{
                "& > img": { mr: 2, flexShrink: 0 },
              }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={option.image}
                alt={option.name}
              />
              <Box
                component="span"
                sx={{
                  fontSize: 14,
                }}
              >
                {option.name} ({option.symbol.toUpperCase()}){" "}
                {option.current_price > 0.1
                  ? formatDollar(option.current_price)
                  : formatDollar(option.current_price, 7)}
              </Box>
            </Box>
          </a>
        </Link>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
          sx={{
            "& label.Mui-focused": {
              display: "none",
            },
            "& legend": {
              display: "none",
            },
          }}
        />
      )}
    />
  );
}
