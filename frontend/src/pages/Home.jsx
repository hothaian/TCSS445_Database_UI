import React from "react"
import BarChartTag from "../components/charts/BarChartTag";
import BarChartItem from "../components/charts/BarChartItem";


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
          <BarChartItem/>
          <BarChartTag/>
          
       


        </div>
      </section>
    </>
  )
}

export default Home