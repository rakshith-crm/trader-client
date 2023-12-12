import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import WindowRoundedIcon from "@mui/icons-material/WindowRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmojiObjectsRoundedIcon from "@mui/icons-material/EmojiObjectsRounded";
import PersonPinRoundedIcon from "@mui/icons-material/PersonPinRounded";

import React from "react";
import { useNavigate } from "react-router-dom";

const ListItems = () => {
  let navigate = useNavigate();

  return (
    <React.Fragment>
      <ListItemButton onClick={() => navigate("/home")}>
        <ListItemIcon>
          <WindowRoundedIcon fontSize="medium" color="action" />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/favourites")}>
        <ListItemIcon>
          <FavoriteIcon fontSize="medium" color="action" />
        </ListItemIcon>
        <ListItemText primary="Favourites" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/suggestions")}>
        <ListItemIcon>
          <EmojiObjectsRoundedIcon fontSize="medium" color="action" />
        </ListItemIcon>
        <ListItemText primary="Suggestions" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/profile")}>
        <ListItemIcon>
          <PersonPinRoundedIcon fontSize="medium" color="action" />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
    </React.Fragment>
  );
};

export default ListItems;
