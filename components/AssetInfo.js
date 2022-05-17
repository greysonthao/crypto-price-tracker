import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";

export default function AssetInfo({ coinData }) {
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
                      width: "100%",
                    }}
                  >
                    Website
                  </Button>
                </a>
              </TableCell>
              <TableCell>
                <a
                  target="_blank"
                  href={
                    coinData.links.facebook_username
                      ? `https://facebook.com/${coinData.links.facebook_username}`
                      : undefined
                  }
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      color: "white",
                      border: "1px white solid",
                      width: "100%",
                    }}
                  >
                    Facebook
                  </Button>
                </a>
              </TableCell>
            </TableRow>
            <TableRow>
              {/* <TableCell>
                <Typography variant="caption" fontWeight="bold" color="white">
                  Explorer
                </Typography>
              </TableCell> */}
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
                    Blockchain Explorer
                  </Button>
                </a>
              </TableCell>
              <TableCell>
                <a
                  target="_blank"
                  href={
                    coinData.links.subreddit_url
                      ? coinData.links.subreddit_url
                      : undefined
                  }
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      color: "white",
                      border: "1px white solid",
                      width: "100%",
                    }}
                  >
                    Reddit
                  </Button>
                </a>
              </TableCell>
            </TableRow>
            <TableRow>
              {/* <TableCell>
                <Typography variant="caption" fontWeight="bold" color="white">
                  Code
                </Typography>
              </TableCell> */}
              <TableCell>
                <a
                  target="_blank"
                  href={
                    coinData.links.repos_url.github[0]
                      ? coinData.links.repos_url.github[0]
                      : undefined
                  }
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      color: "white",
                      border: "1px white solid",
                      width: "100%",
                    }}
                  >
                    Source Code
                  </Button>
                </a>
              </TableCell>
              <TableCell>
                <a
                  target="_blank"
                  href={
                    coinData.links.twitter_screen_name
                      ? `https://www.twitter.com/${coinData.links.twitter_screen_name}`
                      : undefined
                  }
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      color: "white",
                      border: "1px white solid",
                      width: "100%",
                    }}
                  >
                    Twitter
                  </Button>
                </a>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <a
                  target="_blank"
                  href={
                    coinData.links.official_forum_url[0].length > 1
                      ? coinData.links.official_forum_url[0]
                      : undefined
                  }
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      color: "white",
                      border: "1px white solid",
                      width: "100%",
                    }}
                  >
                    Community Forum
                  </Button>
                </a>
              </TableCell>
              <TableCell>
                <a
                  target="_blank"
                  href={`https://twitter.com/search?q=$${coinData.symbol}`}
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
                    <SearchIcon
                      fontSize="small"
                      sx={{ color: "white", marginRight: ".25rem" }}
                    />
                    on Twitter
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
