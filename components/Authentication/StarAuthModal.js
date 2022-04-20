import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Modal from "@mui/material/Modal";
import Login from "./Login";
import Signup from "./Signup";
import { CryptoState } from "../../cryptoContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import Divider from "@mui/material/Divider";
import GoogleIcon from "@mui/icons-material/Google";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import StarBorderIcon from "@mui/icons-material/StarBorder";

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

export default function StarAuthModal() {
  const [value, setValue] = React.useState(0);

  const [open, setOpen] = React.useState(false);

  const { user, setAlert } = CryptoState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setAlert({
          open: true,
          message: `Sign up successful. Welcome ${result.user.email}`,
          type: "success",
        });
        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
      });
  };

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
        <StarBorderIcon fontSize="small" />
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
          <Box p="0 24px 10px 24px">
            <Divider margin={0}>Or</Divider>
            <Box display="flex" justifyContent="center" margin="1rem 0 1rem 0">
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                }}
                onClick={signInWithGoogle}
              >
                <GoogleIcon />
                <Typography
                  marginLeft="3px"
                  variant="body1"
                  textTransform="none"
                >
                  Sign in with Google
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
