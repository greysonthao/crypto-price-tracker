import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { CryptoState } from "../cryptoContext";

export default function Alert() {
  const { alert, setAlert } = CryptoState();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  };

  return (
    <Box>
      <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
        <Box>
          <MuiAlert
            onClose={handleClose}
            elevation={10}
            variant="filled"
            severity={alert.type}
            sx={{
              width: "100%",
            }}
          >
            {alert.message}
          </MuiAlert>
        </Box>
      </Snackbar>
    </Box>
  );
}
