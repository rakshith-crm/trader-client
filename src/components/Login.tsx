import { SyntheticEvent, useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InsertChartRoundedIcon from "@mui/icons-material/InsertChartRounded";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Item, validateEmail } from "./Utils";
import { Snackbar, Alert, AlertColor } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      Trader @rakshith-crm
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState<AlertColor>("error");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      await axios
        .get("http://localhost:8000/auth/user", {
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data);
          navigate("/home");
        })
        .catch(({ error, response }) => {
          console.log(response.data);
        });
    }

    fetchMyAPI();
  }, []);

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (email && password && validateEmail(email)) {
      let formData = { email: email, password: password };
      await axios
        .post("http://localhost:8000/auth/login", formData, {
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
          },
        })
        .then(function (response) {
          console.log(response.data.message);
          setMessage(response.data.message);
          setVariant("success");
          navigate("/home");
        })
        .catch(function ({ error, response }) {
          console.log(error, response.data.message);
          setMessage(response.data.message);
          setVariant("error");
        });
    } else {
      setMessage("Invalid Credentials");
      setVariant("warning");
    }
    setOpen(true);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert severity={variant}>{message}</Alert>
      </Snackbar>

      <Grid container sx={{ alignItems: "center" }}>
        <Grid item>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <InsertChartRoundedIcon />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, marginLeft: 1 }}
          >
            Trader
          </Typography>
        </Grid>
      </Grid>
      <Container component="main" maxWidth="md">
        <Item sx={{ height: "auto" }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid item>
                <Button onClick={() => navigate("/register")}>
                  Don't have an account? Register Now
                </Button>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Item>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
