import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, Typography } from "@mui/material";

interface TradeQualityProps {
  ticker_code: string;
}

const TradeQuality = ({ ticker_code }: TradeQualityProps) => {
  const [tradeQualities, setTradeQualities] = useState([]);
  useEffect(() => {
    async function getTickers() {
      let ticker = ticker_code.replace("&", "%26");
      let url = `http://localhost:8000/core/ticker?ticker_code=${ticker}`;
      await axios
        .get(url, {
          headers: {
            "Content-type": "application/json",
          },
        })
        .then((res) => {
          console.log("Trade quality", res.data.trade_quality);
          setTradeQualities(res.data.trade_quality);
        })
        .catch(({ error, response }) => {
          console.log(response.data);
        });
    }

    getTickers();
  }, []);
  return (
    <>
      <Typography variant="h6" style={{ textAlign: "center" }}>
        TRADE QUALITY - {ticker_code}
      </Typography>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        {tradeQualities.map((quality) => (
          <div key={quality[0]}>
            <ListItem>
              <ListItemAvatar>
                <Typography variant="subtitle2">( {quality[0]} )</Typography>
              </ListItemAvatar>
              <ListItemText primary={quality[1]} />
              {quality[2] ? (
                <CheckCircleIcon fontSize="large" color="success" />
              ) : (
                <CancelIcon fontSize="large" color="error" />
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </>
  );
};

export default TradeQuality;
