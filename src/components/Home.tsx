import React, { Suspense, useEffect, useState } from "react";
import { Grid, Pagination, Stack, Typography } from "@mui/material";
import axios from "axios";
const Company = React.lazy(() => import("./Company"));

interface CompanyProp {
  ticker_code: string;
  company_name: string;
}

const Home = () => {
  const [page, setPage] = useState(1);
  const chartsPerPage = 8;
  const [companies, setCompanies] = useState<CompanyProp[]>([]);

  const deleteCompany = async (ticker: string) => {
    try {
      const url = `http://localhost:8000/core/ticker?ticker_code=${ticker}`;
      const response = await axios.delete(url);
      console.log("Response:", response.data);
      setCompanies(
        companies.filter((company) => company.ticker_code !== ticker)
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    async function getTickers() {
      await axios
        .get("http://localhost:8000/core/all_tickers", {
          headers: {
            "Content-type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data.tickers);
          setCompanies(res.data.tickers);
        })
        .catch(({ error, response }) => {
          console.log(response.data);
        });
    }

    getTickers();
  }, []);

  const pageCount = Math.ceil(companies.length / chartsPerPage);

  return (
    <>
      <Stack
        direction={"row-reverse"}
        style={{ flex: 1 }}
        margin={3}
        spacing={4}
      >
        <Pagination
          count={pageCount}
          page={page}
          color="primary"
          onChange={(event, value) => {
            setPage(value);
          }}
        />
        <Typography variant="h5" style={{ textAlign: "left", flex: 1 }}>
          {"Home".toUpperCase()}
        </Typography>
      </Stack>
      <Grid container>
        {companies
          .slice((page - 1) * chartsPerPage, page * chartsPerPage)
          .map(({ company_name, ticker_code }) => (
            <Company
              company_name={company_name}
              ticker_code={ticker_code}
              key={company_name}
              deleteCompany={deleteCompany}
            />
          ))}
      </Grid>

      <Stack
        direction={"row-reverse"}
        style={{ flex: 1 }}
        margin={3}
        spacing={4}
      >
        <Pagination
          count={pageCount}
          page={page}
          color="primary"
          onChange={(event, value) => {
            window.scrollTo({ top: 0 });
            setPage(value);
          }}
        />
      </Stack>
    </>
  );
};

export default Home;
