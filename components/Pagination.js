import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BasicPagination(props) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={props.count}
        color="primary"
        onChange={props.handlePageChange}
        sx={{
          "&.MuiPagination-text": { color: "white" },
          backgroundColor: "white",
          borderRadius: 3,
          padding: "1rem",
        }}
      />
    </Stack>
  );
}
