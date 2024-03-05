import React from "react"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import BarChartTag from "../components/charts/BarChartTag";
import BarChartItem from "../components/charts/BarChartItem";
import BarChartOrder from "../components/charts/BarChartOrder";

const Home = () => {
  return (
    <>
      <section className='home'>
        <div className='container'>
          <div className='heading flexSB'>
            <Typography variant="h5" color="white">Admin Dashboard</Typography>

          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <BarChartOrder />
            </Grid>
            <Grid item xs={12} sm={6}>
              <BarChartItem />
            </Grid>
            <Grid item xs={12} sm={6}>
              <BarChartTag />
            </Grid>
          </Grid>
        </div>
      </section>
    </>
  );
};
export default Home