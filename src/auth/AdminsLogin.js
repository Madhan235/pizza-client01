import React, { useState } from 'react'
import { AuthHeader } from 
'./AuthHeader'
import { useContext } from 'react'
import DataContext from '../ContextApi/DataContext'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { GiFullPizza } from 'react-icons/gi'

export const spinningPizza =  
<GiFullPizza className='full-pizza' size={30}/>

const AdminsLogin = () => {
    const{email,setEmail,password,setPassword,error,setError} = useContext(DataContext)
    const user = {email, password}
    const [successMsg , setSuccessMsg] =  useState(false)
    const canSave = Boolean(email) && Boolean(password);  
    const navigate = useNavigate();
    
    const mailbutton = Boolean(email) && !Boolean(password);

    //LOGIN FUNCTION
    const handleLogin = async ()=>{
      try {
          const response = await api.post('/admins/login', user)
          console.log("response:" , response.data.token)
          localStorage.setItem('token',response.data.token)
          navigate("/admins/home")
        
          sessionStorage.setItem('adminMail',JSON.stringify(email));
          
         setEmail("");
         setPassword("");

      } catch (error) {
          console.error('Error data:', error.response.data);
    setError(error.response.data.err)
    const timeout = () =>{setTimeout(()=>{
      setError("")
     },3000);
    }
     timeout();
      }
      }

      //FORGOT PASSWORD FUNCTION 
      const mailLink = async () => {
        try {
          const response = await api.post('/admins/forgetpassword', {email})
        console.log(response.data)
        setSuccessMsg(true);
        const timeout = () =>{setTimeout(()=>{
          setSuccessMsg(false);
         },3000);
        }
         timeout();
        } catch (error) {
          console.log("Error:", error )
          setError(error.response.data.err)
          const timeout = () =>{setTimeout(()=>{
            setError("")
           },3000);
          }
           timeout();
        }
        
      }
    
  return (
    <>
    <AuthHeader/>
     
    {!successMsg ? (
    <section className='user-signup-input'>
             
            <input type='email'
            placeholder='Email'
            id='userEmail'
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value.trim())}
            />
           
            <input type='password'
            placeholder='Password'
            id='password'
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value.trim())}
            />
             <button style={{ cursor: canSave ? 'pointer' : 'not-allowed' }} disabled={!canSave} onClick={handleLogin}>Login</button>

              
             <button   disabled={!mailbutton}
             style={{cursor : email && !password ? "pointer" : "not-allowed"}}
             onClick={mailLink}>Forget Password</button>
              
             {error && <p style={{color:"red"}}>{error}</p>}
    </section> ) 
    : ""}
    
   {successMsg ? (   <section>
    <h3 className='forget-msg'>
            Reset Password link has been sent to the Registered Email !! <GiFullPizza />
          </h3>
    </section> )
    : "" }
    </>
  )
}

export default AdminsLogin