import { Typography, Divider, Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Item } from "./Utils";
import profile from "../assets/profile.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ id: "", name: "", email: "" });

  const userLogout = async () => {
    console.log("Logging out");
    await axios
      .post("http://localhost:8000/auth/logout", {}, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      });
  };

  useEffect(() => {
    async function getUserProfile() {
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
        })
        .catch(({ error, response }) => {
          console.log(response.data);
        });
    }

    getUserProfile();
  }, []);
  return (
    <>
      <Paper className="container" style={{ margin: 3, padding: 20 }}>
        <Typography sx={{ marginTop: 2 }} variant="h4">
          Your Profile
        </Typography>
        <Divider />
        <img src={profile} style={{ height: 200, width: 200, marginTop: 10 }} />
        <div className="border p-2 mt-4">
          <Typography variant="h6" sx={{ marginY: 1 }}>
            Name
          </Typography>
          <Typography variant="body1" sx={{ marginY: 1 }}>
            {user.name}
          </Typography>
        </div>
        <div className="border p-2">
          <Typography variant="h6" sx={{ marginY: 1 }}>
            Email
          </Typography>
          <Typography variant="body1" sx={{ marginY: 1 }}>
            {user.email}
          </Typography>
        </div>
        <Button
          variant="contained"
          color="error"
          sx={{ marginTop: 5 }}
          onClick={() => userLogout()}
        >
          Logout
        </Button>
      </Paper>
    </>
  );
};

export default Profile;
