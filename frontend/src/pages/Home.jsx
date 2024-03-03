import React from "react"
import Cards from "../components/cards/Cards"
import Charts from "../components/charts/Charts"
import UpdateClothingItem from "../components/update/UpdateClothingItem";


const Home = () => {
  return (
    <>
      <section className='home'>
        <div className='container'>
          <div className='heading flexSB'>
            <h3>DashBoard</h3>
            <span>Admin</span>
          </div>
          <Cards />
          <Charts />
          <UpdateClothingItem/>
       


        </div>
      </section>
    </>
  )
}

export default Home