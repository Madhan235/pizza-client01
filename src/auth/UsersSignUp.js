import React from 'react'
import { AuthHeader } from 
'./AuthHeader'
import { useContext } from 'react'
import DataContext from '../ContextApi/DataContext'
import api from '../api'
import { useNavigate } from 'react-router-dom'


const UsersSignUp = () => {
    const{email,setEmail,password,setPassword,error,setError} = useContext(DataContext)
    const user = {email, password}
    const canSave = Boolean(email) && Boolean(password);  
    const navigate = useNavigate();
    
    const handleSignup = async ()=>{
      try {
          const response = await api.post('/users/signup', user)
          localStorage.setItem("token", response.data.token)
          localStorage.setItem('email',email)
          setEmail("")
          setPassword("")

          navigate("/users/home")
      
         
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
      
  return (
    <>
    <AuthHeader/>
    <section className='user-signup-input'>
             
            <input type='text'
            placeholder='Email'
            id='userEmail'
            value={email}
            onChange={(e)=>setEmail(e.target.value.trim())}
            required
            autoFocus
            />
           
            <input type='password'
            placeholder='Password'
            id='password'
            value={password}
            onChange={(e)=>setPassword(e.target.value.trim())}
            required
            />
             <button style={{ cursor: canSave ? 'pointer' : 'not-allowed' }} disabled={!canSave} onClick={handleSignup}>SignUp</button>
             {error && <p style={{color:"red"}}>{error}</p>}
    </section>
    </>
  )
}

export default UsersSignUp