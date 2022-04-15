import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import SmallChart from "../components/SmallChart";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightBold,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    /* color: theme.palette.common.white, */
    border: theme.palette.common.black,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables(props) {
  const formatPercent = (number) => `${new Number(number).toFixed(2)}%`;

  const formatDollar = (number, maximumSignificantDigits) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "usd",
      maximumSignificantDigits,
    }).format(number);

  let tableElements = props.data.map((coin) => (
    <StyledTableRow key={coin.id}>
      <StyledTableCell component="th" scope="row">
        {coin.market_cap_rank}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        <Link
          href={`/assets/${coin.id}`}
          underline="none"
          textDecoration="none"
        >
          <a>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image src={coin.image} alt={coin.name} width={20} height={20} />
              <Typography
                variant="body1"
                component="p"
                sx={{
                  marginLeft: 1,
                  fontSize: "0.87rem",
                }}
              >
                {coin.name}
              </Typography>
            </Box>
          </a>
        </Link>
      </StyledTableCell>
      <StyledTableCell align="left">
        {coin.symbol.toUpperCase()}
      </StyledTableCell>
      <StyledTableCell align="right">
        {coin.current_price > 0.1
          ? formatDollar(coin.current_price)
          : formatDollar(coin.current_price, 7)}
      </StyledTableCell>
      <StyledTableCell
        align="right"
        sx={{
          color: "default",
          ...(coin.price_change_percentage_24h > 0 && {
            color: "green",
          }),
          ...(coin.price_change_percentage_24h < 0 && {
            color: "red",
          }),
        }}
      >
        {formatPercent(coin.market_cap_change_percentage_24h)}
      </StyledTableCell>
      <StyledTableCell align="right">
        {formatDollar(coin.market_cap, 20)}
      </StyledTableCell>
      {/* <StyledTableCell align="right">24Hr Chart</StyledTableCell> */}
      <StyledTableCell
        align="right"
        sx={{
          padding: 0,
        }}
      >
        <SmallChart coin={coin.id} height={50} />
      </StyledTableCell>
    </StyledTableRow>
  ));

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Symbol</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">24Hr Change</StyledTableCell>
            <StyledTableCell align="right">Market Cap</StyledTableCell>
            <StyledTableCell align="center">24Hr Chart</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableElements}</TableBody>
      </Table>
    </TableContainer>
  );
}
