import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function AssetInfo({ coinData }) {
  console.log("coinData: ", coinData.links);
  return (
    <Box marginTop="1rem">
      <TableContainer>
        <Table
          size="small"
          aria-label="a dense table"
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: "none",
            },
          }}
        >
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography variant="caption" fontWeight="bold" color="white">
                  Website
                </Typography>
              </TableCell>
              <TableCell>
                <a
                  target="_blank"
                  href={coinData.links.homepage[0]}
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      color: "white",
                      border: "1px white solid",
                    }}
                  >
                    {coinData.links.homepage[0]}
                  </Button>
                </a>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="caption" fontWeight="bold" color="white">
                  Explorer
                </Typography>
              </TableCell>
              <TableCell>
                <a
                  target="_blank"
                  href={coinData.links.blockchain_site[0]}
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      color: "white",
                      border: "1px white solid",
                    }}
                  >
                    {coinData.links.blockchain_site[0]}
                  </Button>
                </a>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="caption" fontWeight="bold" color="white">
                  Code
                </Typography>
              </TableCell>
              <TableCell>
                <a
                  target="_blank"
                  href={
                    coinData.links.repos_url.github[0] &&
                    coinData.links.repos_url.github[0]
                  }
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      color: "white",
                      border: "1px white solid",
                    }}
                  >
                    Github Repo
                  </Button>
                </a>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="caption" fontWeight="bold" color="white">
                  Community
                </Typography>
              </TableCell>
              <TableCell>
                <a
                  target="_blank"
                  href={
                    coinData.links.official_forum_url[0] &&
                    coinData.links.official_forum_url[0]
                  }
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      color: "white",
                      border: "1px white solid",
                    }}
                  >
                    {coinData.links.official_forum_url[0]
                      ? coinData.links.official_forum_url[0]
                      : "N/A"}
                  </Button>
                </a>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
