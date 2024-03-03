import React from "react"
import ClothingTable from '../components/table/ClothingTable';


const ClothingItem = () => {
  return (
    <>
      <section className='home'>
        <div className='container'>
          <ClothingTable/>
        </div>
      </section>
    </>
  )
}

export default ClothingItem