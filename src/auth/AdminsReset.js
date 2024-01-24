import React, { useState } from 'react'
import api from '../api';
import { useParams } from 'react-router-dom';

const AdminsReset = () => {
    const {id, token} = useParams();
    const [newPassword, setNewPassword]=useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [changed, setChanged] = useState(false);
    const [error, setError] = useState("")
    
    const canSave = Boolean(newPassword) && Boolean(confirmPassword) ;
    const handleUpdate = async()=>{
        try {
            const passwords = { newPassword, confirmPassword}
            
          
            const response = await api.post(`/admins/resetpassword/${id}/${token}`, passwords)
                setChanged(response.data.changed);
            
            
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
    { !changed ? ( <section className='user-signup-input'>
        
        <h3>Please Enter Your New Password !! </h3>
        <input type='password'
        placeholder='New Password'
        value={newPassword}
        onChange={(e)=>setNewPassword(e.target.value.trim())}
         required         
        />
        <input type='password'
        placeholder='confirm Password'
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value.trim())}
         required
        />
        <button onClick={handleUpdate} 
        style={{ cursor: canSave ? 'pointer' : 'not-allowed' }} disabled={!canSave}>Update</button>

            {error ? (
            <p style={{ color: 'red', textAlign: 'center', backgroundColor: '#ffd699', fontWeight:"600"}}>{error}</p>
            ) : ""}

    </section>) : ''
}
     { changed? <h3 className='reset-success-msg'>Password Changed Successfully!! Please Return to the Login Page </h3> : ""}

   
    </>
  )
}

export default AdminsReset

 