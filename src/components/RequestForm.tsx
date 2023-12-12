import {
  Typography,
  Grid,
  IconButton,
  CircularProgress,
  Alert,
  Snackbar,
  AlertColor,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { SyntheticEvent, useState } from "react";

const RequestForm = () => {
  const [ticker, setTicker] = useState("");
  const [processing, setProcessing] = useState(false);
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState<AlertColor>("error");
  const [message, setMessage] = useState("");

  const requestTicker = async (event: SyntheticEvent) => {
    event.preventDefault();
    const formData = { ticker: ticker.toUpperCase() };
    setProcessing(true);
    await axios
      .post("http://localhost:8000/core/ticker", formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setVariant("success");
        setOpen(true);
        setMessage(res.data.message);
      })
      .catch(({ error, response }) => {
        console.log(response.data);
        setVariant("error");
        setOpen(true);
        setMessage(response.data.message);
      });
    setProcessing(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert severity={variant}>{message}</Alert>
      </Snackbar>
      <form onSubmit={(e) => requestTicker(e)}>
        <div className="form-group">
          <Typography variant="overline">
            <b>Ticker code</b>
          </Typography>
          <Grid container sx={{ marginBottom: 1 }}>
            <Grid item>
              <input
                className="form-control"
                onChange={(e) => setTicker(e.target.value)}
              />
            </Grid>
            <Grid item>
              {processing ? (
                <CircularProgress color="warning" sx={{ marginLeft: 2 }} />
              ) : (
                <IconButton
                  sx={{ bgcolor: "secondary.main", marginLeft: 2 }}
                  type="submit"
                >
                  <SendIcon htmlColor="white" />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </div>
      </form>
    </>
  );
};

export default RequestForm;
