import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = () => {
    console.log("handlesubmit");
  };

  return (
    <Box
      p={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></TextField>
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></TextField>

      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        sx={{ backgroundColor: "black" }}
      >
        Submit
      </Button>
    </Box>
  );
}
