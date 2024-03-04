import React from "react"
import Cards from "../components/cards/Cards"

import UpdateClothingItem from "../components/update/UpdateClothingItem";
import BarChartItem from "../components/charts/BarChartItem";
import BarChart from "../components/charts/BarChart";


const Home = () => {
  return (
    <>
      <section className='home'>
        <div className='container'>
          <div className='heading flexSB'>
            <h3>DashBoard</h3>
            <span>Admin</span>
          </div>
          {/* <Cards /> */}
          <BarChart/>
          {/* <BarChartItem/> */}
          
       


        </div>
      </section>
    </>
  )
}

export default Home