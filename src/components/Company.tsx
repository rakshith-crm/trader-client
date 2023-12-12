import {
  Button,
  Grid,
  IconButton,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Suspense } from "react";
import { Item } from "./Utils";
import Image from "./Image";
import TradeQuality from "./TradeQuality";
import DeleteIcon from "@mui/icons-material/Delete";

interface CompanyProps {
  company_name: string;
  ticker_code: string;
  deleteCompany: Function;
}

const Company = ({
  company_name,
  ticker_code,
  deleteCompany,
}: CompanyProps) => {
  return (
    <>
      <Suspense fallback={<div>Loading</div>} key={company_name}>
        <Grid item={true} xs={8} md={8} xl={8}>
          <Item>
            <div style={{ flex: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{ flex: 1, textAlign: "left" }}
              >
                <b>{company_name}</b>
                <IconButton onClick={() => deleteCompany(ticker_code)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Typography>
              <Image company_name={ticker_code} />
            </div>
          </Item>
        </Grid>
        <Grid item={true} xs={4} md={4} xl={4}>
          <Item sx={{ height: 500 }}>
            <TradeQuality ticker_code={ticker_code} />
          </Item>
        </Grid>
      </Suspense>
    </>
  );
};

export default Company;
