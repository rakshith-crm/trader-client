import React, { useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InsertChartRoundedIcon from "@mui/icons-material/InsertChartRounded";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItems from "./ListItems";
import { Alert, AlertColor, Avatar, Snackbar } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RequestForm from "./RequestForm";
import Logout from "./Logout";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

interface DashboardProps {
  component: React.ReactNode;
}
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Dashboard = ({ component }: DashboardProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [variant, setVariant] = useState<AlertColor>("error");

  const toggleDrawer = () => {
    setOpen(!open);
  };
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
          setUser(res.data);
          setMessage("Authenticated");
          setVariant("success");
        })
        .catch(({ error, response }) => {
          console.log(response.data);
          setMessage(response.data.detail);
          setVariant("error");
          navigate("/login");
        });
    }

    fetchMyAPI();
    setAlertOpen(true);
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert severity={variant}>{message}</Alert>
      </Snackbar>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <InsertChartRoundedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, marginLeft: 1 }}
            >
              Trader
            </Typography>
            <RequestForm />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>

          <List component="nav">
            <ListItems />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {component}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
