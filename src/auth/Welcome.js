import React from 'react'
import pizzaImg from '../images/fullsizepizza.jpg'
 import { Link } from 'react-router-dom'
  
const Welcome = () => {
  return (
    <>
    <header className='welcome-header'>
        <img className="welcome-img" src={pizzaImg} alt='chessyPizza'/>
    </header>
    <main className='welcome-main'>
       <section className='user-admin'>
        <Link to="/users"><button>User</button></Link>
        <Link to="/admins"><button>Admin</button></Link>
     </section>
    </main>
   
    </>

  )
}

export default Welcome