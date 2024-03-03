import React from "react"
import UserTable from '../components/table/UserTable';


const User = () => {
  return (
    <>
      <section className='home'>
        <div className='container'>
          <UserTable/>
        </div>
      </section>
    </>
  )
}

export default User