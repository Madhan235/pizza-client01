
import './App.css';
import UsersSignUp from './auth/UsersSignUp';
import Welcome from './auth/Welcome';
 import { Routes, Route } from 'react-router-dom';
 import Footer from './auth/Footer';
import { DataProvider } from './ContextApi/DataContext';
import UsersSUorLI from './auth/UsersSUorLI';
import UsersLogin from './auth/UsersLogin';
import AdminsSUorLI from './auth/AdminsSUorLi';
import AdminsSignUp from './auth/AdminsSignup';
import AdminsLogin from './auth/AdminsLogin';
import UsersHome from './components/UsersHome';
import AdminsHome from './components/AdminsHome';
import UsersReset from './auth/UsersReset';
import AdminsReset from './auth/AdminsReset';
import Cart from './components/Cart';
import Orders from './components/Orders';

function App() {
  return (
     
     <DataProvider>
     <Routes>
      
      <Route path='/' element={<Welcome/>}/>
      {/* SEPARATE USERS ROUTE */}
       
       <Route path='/users'  >
         <Route index element={<UsersSUorLI/>} />
         <Route path='signup' element={<UsersSignUp/>}/>
         <Route path='login' element={<UsersLogin/>}/>
         <Route path='resetpassword/:id/:token' element={<UsersReset/>}/>
         <Route path='home' element={<UsersHome/>}/>
         <Route path='cart' element={<Cart/>} />
         <Route path='orders' element={<Orders/>}/>
        
       </Route>
       {/* SEPARATE  ADMINS ROUTE */}
       <Route path='/admins'>
        <Route index element={<AdminsSUorLI/>}/>
        <Route path='signup' element={<AdminsSignUp/>}/>
         <Route path='login' element={<AdminsLogin/>}/>
         <Route path='resetpassword/:id/:token' element={<AdminsReset/>} />
         <Route path='home' element={<AdminsHome/>}/>


       </Route>
     </Routes>
     </DataProvider>
      
       
    
  );
}

export default App;
