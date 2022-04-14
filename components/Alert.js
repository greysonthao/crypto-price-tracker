import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";

export default function Alert(props) {
  const [alert, SetAlert] = React.useState({
    open: false,
    message: "",
    type: "success",
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert((alert.open = false));
  };

  return (
    <Box>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert
          onClose={handleClose}
          elevation={10}
          variant="filled"
          severity={alert.type}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}
