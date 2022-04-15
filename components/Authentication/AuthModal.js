import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Modal from "@mui/material/Modal";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Login from "./Login";
import Signup from "./Signup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 0,
  borderRadius: 3,
};

export default function AuthModal() {
  const [value, setValue] = React.useState(0);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(value);

  return (
    <div>
      <Box
        onClick={handleOpen}
        sx={{
          cursor: "pointer",
          marginLeft: "1rem",
          marginRight: ".5rem",
        }}
      >
        <AccountCircle />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AppBar
            position="static"
            sx={{
              backgroundColor: "transparent",
              color: "white",
            }}
          >
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>
          </AppBar>
          {value === 0 ? (
            <Login handleClose={handleClose} />
          ) : (
            <Signup handleClose={handleClose} />
          )}
        </Box>
      </Modal>
    </div>
  );
}
