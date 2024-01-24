import React from 'react'
import { AuthHeader } from './AuthHeader'
import { Link } from 'react-router-dom'
import { FaPizzaSlice } from "react-icons/fa";
import { GiFullPizza } from "react-icons/gi";

export const spinningPizza =  <section className='singup-login-msg'>
<h4>New Here ! Please SignUp <FaPizzaSlice/></h4>
<GiFullPizza className='full-pizza' size={30}/>
<h4>Already a Member, Please Login In ! <FaPizzaSlice/></h4>
</section>

const UsersSUorLI = () => {
    
  return (
    <>
    <AuthHeader/>
     {spinningPizza}
     <section className='user-admin'>
        <Link to="/users/signup"><button>SignUp</button>
        </Link>
        <Link to="/users/login"><button>Login</button></Link>
    </section>
    </>
  )
}

export default UsersSUorLI