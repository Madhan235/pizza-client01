import React, { useContext, useState } from 'react'
import { GiFullPizza } from 'react-icons/gi'
import DataContext from '../ContextApi/DataContext'
import { Link, useNavigate } from 'react-router-dom';
import { IoBagCheck } from "react-icons/io5";

import { CiLogout } from "react-icons/ci";

const UsersHeader = () => {
    const navigate = useNavigate();
    const {deliveryOption, setDeliveryOption,search,setSearch,cart} = useContext(DataContext); 
    const cartData = JSON.parse(sessionStorage.getItem('cartData'));

    const customizeData = JSON.parse(sessionStorage.getItem('customizeData'));

if((cart && cart?.length !== 0) || (customizeData && customizeData?.length !== 0)){
    var cartLength = (cart ? cartData?.length : 0) + (customizeData ? customizeData?.length : 0);}

    const hanldeLogOut = () => {
      localStorage.removeItem('email');
      navigate("/users/login");
    }
  return (
    <header className='user-home'>
        <section className='user-home-header'> 
            <h2> <GiFullPizza/> Cheese Factory</h2>
  <div className='delivery-div'>
            <label>
                <input type="radio" name="deliveryOption" 
                value="delivery"
                checked={deliveryOption === "delivery"} 
                onChange={(e)=>setDeliveryOption(e.target.value)}/>
                Delivery
            </label>
            <label>
                <input type="radio" name="deliveryOption" value="dineIn"
                onChange={(e)=>setDeliveryOption(e.target.value)}
                />
                Dine-In
            </label>
            <Link to='/users/cart' > 
            <p style={{fontWeight:"bolder"}}>  <IoBagCheck/> Cart {cartLength? cartLength : 0} </p>
            </Link>
    </div>
        <input type='search'
        className='search-input'
        name='searchBox'
        placeholder="search pizza's..."
        value={search}
        onChange={(e)=>setSearch(e.target.value.toLowerCase())}
        />
        <button  onClick={hanldeLogOut}><CiLogout/></button>
        </section>
        
        <section className='header-pages'>
            <a href='#recommended'><p>Recommended</p></a>
            <a href='#veg'><p>Veg</p></a>
            <a href='#non-veg'><p>Non-Veg</p></a>
            <a href='#customize'><p>Customize</p></a>

        </section>
        
    </header>
  )
}

export default UsersHeader