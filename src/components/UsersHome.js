import React, { useContext, useEffect, useState} from 'react'
import UsersHeader from './UsersHeader'
import DataContext from '../ContextApi/DataContext';

import { FaMinus } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { Link } from 'react-router-dom';
import { IoBagCheck, IoThermometerSharp } from "react-icons/io5";
import { FaHotjar } from "react-icons/fa";

const UsersHome = () => {
   const { recommendedMenu,setRecommendedMenu,search,vegMenu, setVegMenu,nonVegMenu, setNonVegMenu,allPizzas,setAllPizzas,crustOptions,setCrustOptions,sausageOptions,setSausageOptions,cheeseOptions,setCheeseOptions,veggiesOptions,setVeggiesOptions,meatOptions,setMeatOptions, cart,setCart,
    customizeCart,setCustomizeCart,handleAddingQuantity,handleSubtractingQuantity,findPizzaQuantity,refresh,setRefresh,removeFromCart,pizzaValue,setPizzaValue,deliveryOption,} = useContext(DataContext);

    
   useEffect(() => {
    try {

      var storedCart = JSON.parse(sessionStorage.getItem('cartData'));
      storedCart?.length !== 0 ? setCart(storedCart) : setCart([]) ;

      var storedCustomizeCart = JSON.parse(sessionStorage.getItem('customizeData'));
      storedCustomizeCart?.length !== 0 ? setCustomizeCart(storedCustomizeCart) : setCustomizeCart([])  ;

        
       
    } catch (error) {
      console.error('Error in useEffect:', error);
    }
  }, [refresh]);

   
   const filteredPizzas =  allPizzas?.filter((item) => item.name.toLowerCase().includes(search))

   
   const handleSizeChange = (menu,setMenu,itemId,value) => {
    if(!value){
      return ;
    }
    const [selectedName, selectedPrice] = value?.split(',');
    const updatedMenu = menu?.map((item) => item._id === itemId ? {...item, price: Number(selectedPrice)} : item);
   setMenu(updatedMenu)
   
  };


    const handleCart = (pizza)=>{
     const [selectedSize, selectedPrice] = pizzaValue.split(',');
      setCart((prevCart)=>{
        const updatedCart = prevCart ?  
            [...prevCart,
              {...pizza,
                quantity:1,
                size:selectedSize,via:deliveryOption },
            ]
            : [
              {...pizza,
                quantity:1,
                size:selectedSize,via:deliveryOption},
              ]
              sessionStorage.setItem('cartData', JSON.stringify(updatedCart));
              return updatedCart;
    })
    
    }

    const itemInCart = (itemId)=>{
if(cart?.length !== 0){  const cartData = sessionStorage.getItem('cartData');
      const cartArr = JSON.parse(cartData);
      return cartArr?.some(item => item._id === itemId) }     
    }


    
      const [selectedVeggies, setSelectedVeggies] = useState([]);

      const [selectedMeats,setSelectedMeats] = useState([]);

      const [selectedCrust,setSelectedCrust] = useState("");
      const [selectedSausage,setSelectedSausage] = useState("");
      const [selectedCheese, setSelectedCheese] = useState("");

       

     const handleCrustChange = (crust) =>{
       try{
         
        setSelectedCrust(crust)
         
       }   catch(error){
            console.log(error);
       }     
     }

     const handleSausageChange = (sausage) =>{
      try{
        setSelectedSausage(sausage);
       }   catch(error){
            console.log(error);
       }   
     }

     const handleCheeseChange = (cheese) =>{
      try{
        setSelectedCheese(cheese);
       }   catch(error){
            console.log(error);
       }   
     }
     
    
      const handleVeggiesChange = (selectedItem) => {  
        try {
          
          if(!selectedVeggies?.some((item)=>item.name === selectedItem.name)){
            setSelectedVeggies((prevItem)=>(prevItem ? [...prevItem,selectedItem] : [selectedItem]));
          } else{
            setSelectedVeggies(selectedVeggies.filter((item) => item.name !== selectedItem.name))
          }
          
        } catch (error) {
          console.log(error);
        }
        
      }
       
      const handleMeatChange = (selectedItem) =>{
        try {
          if(!selectedMeats.some((item)=>item.name === selectedItem.name)){
            setSelectedMeats((prevItem)=>(prevItem ? [...prevItem,selectedItem] : [selectedItem]) );
          } else{
            setSelectedMeats(selectedMeats.filter((item) => item.name !== selectedItem.name))
          }
        } catch (error) {
          console.log(error);
        }
       }
       
    const handleCustomizeOptions =() => {
     
try {
   
     var userMail = localStorage.getItem('email');
        
     var timeAndDate = new Date().toLocaleString();
     
  
  var customizedOptionsArr =
  [ {
    selectedCrust,
    selectedSausage,
    selectedCheese,
    selectedVeggies,
    selectedMeats,
    email:userMail,
    orderedAt:timeAndDate,
    orderStaus: "Sent to Kitchen",
  }]

  let total = 0;

  customizedOptionsArr.forEach((item) => {
    total += item.selectedCrust.price;
    total += item.selectedCheese.price;
    total += item.selectedSausage.price;
  
    // Add the price of each selected veggie
    item.selectedVeggies.forEach((veggie) => {
      total += veggie.price;
    });
  
    // Add the price of each selected meat
    item.selectedMeats.forEach((meat) => {
      total += meat.price;
    });
  });
   
  var newTotal = Number(total) - 210;
   

  const generateRandomId = () => {
    const prefix = 'customId_';  
    const randomId = Math.random().toString(36).substring(2);
    return prefix + randomId;
  };

  var newCustomizedOptionsArr =   {
    selectedCrust,
    selectedSausage,
    selectedCheese,
    selectedVeggies,
    selectedMeats,
    email:userMail,
    orderedAt:timeAndDate,
    orderStatus: "Sent to Kitchen",
    total,
    newTotal,
    randomId: generateRandomId(),
  }

   

  setCustomizeCart((prevCart) =>
      prevCart && Array.isArray(prevCart) ?
      [...prevCart, { ...newCustomizedOptionsArr }]
      : [{ ...newCustomizedOptionsArr }]
    )

  const updatedCustomizeCart =  
 customizeCart ?  [...customizeCart, { ...newCustomizedOptionsArr }]
    : [{ ...newCustomizedOptionsArr }] ;
  
   

   sessionStorage.setItem('customizeData',JSON.stringify(updatedCustomizeCart));
 
   setSelectedCrust("");
   setSelectedSausage("");
   setSelectedCheese("");
   setSelectedVeggies([]);
   setSelectedMeats([]);
   
 

  setRefresh(!refresh); 
 
} catch (error) {
  console.log(error);
}
    }
   
    

  return (
    <>
  <UsersHeader />
  <main>
    {!search ? (<div>
      {/* RECOMMENDED MENU */}
  <section>
    <div className='menu-cart'>
  <h3 className='menu-heading' id='recommended' >Recommended  </h3>
  <Link to='/users/orders' className='orders-link'>
            <p style={{fontWeight:"bolder",backgroundColor:"#ffcc80",borderRadius:"1rem",padding:".7rem"}}> <FaHotjar/> Orders</p>
            </Link>

            <Link to='/users/cart' className='fixed-cart'>
            <p style={{fontWeight:"bolder",backgroundColor:"#ffcc80",borderRadius:"1rem",padding:".7rem"}}> <IoBagCheck/> Cart {(cart ? cart.length : 0) + (customizeCart ? customizeCart.length : 0)} </p>
            </Link>

            </div>
  <section className='home-menu' >
  {recommendedMenu?.map((data, index) => (
    <section key={index} className='user-menu'>
      <img src={data.img} alt={data.name} />
      <p style={{fontWeight:"bolder"}}>{data.name}</p>
      <p>{data.description}</p>
      <p>₹ {findPizzaQuantity(data._id) ? data.price * findPizzaQuantity(data._id) : data.price} </p>
      <p>
        <select onChange={(e) =>  handleSizeChange(recommendedMenu,setRecommendedMenu,data._id,e.target.value,
          setPizzaValue(e.target.value))}>
          <option value={""}>Choose one size</option>
          {data.size.map((sizeData, sizeIndex) => (
            <option key={sizeIndex} value={`${sizeData.name},${sizeData.price}`}
            >
              {sizeData.name} - {sizeData.description} - ₹ {sizeData.price}
            </option>
          ))}
        </select>
      </p>
      {!itemInCart(data._id)||findPizzaQuantity(data._id) === 0? (
      
      <button className='cart-btn' disabled={!data.price} style={{ cursor: data.price ? 'pointer' : 'not-allowed' }}
 onClick={()=>handleCart(data)} >Add to Cart</button>
  ) : ( 
    <div className='quantity-btn'>
    
    <button
  className='minus'
  onClick={() => {
    findPizzaQuantity(data._id) === 1
      ? removeFromCart(data._id)
      : handleSubtractingQuantity(data._id);
  }}
>
  <FaMinus />
</button>
    
  <p>{findPizzaQuantity(data._id)}</p>
  <button className='add'
  onClick={()=>handleAddingQuantity(data._id)}
  ><MdAdd/></button> 
 </div>
  )} 
    </section>
  ))}
  </section>
  </section>

{/* VEG */}

<section>
  <div className='menu-cart '>
  <h3 className='menu-heading' style={{backgroundColor:"green"}}id='Veg' >Veg </h3>
  
  </div>
  <section className='home-menu' >
  {vegMenu?.map((data, index) => (
    <section key={index} className='user-menu'>
      <img src={data.img} alt={data.name} />
      <p style={{fontWeight:"bolder"}}>{data.name}</p>
      <p>{data.description}</p>
      {console.log()}
      <p>₹ {findPizzaQuantity(data._id) ? data.price * findPizzaQuantity(data._id) : data.price} </p>
      <p>
        <select onChange={(e) =>  handleSizeChange(vegMenu,setVegMenu,data._id,e.target.value,
          setPizzaValue(e.target.value))}>
          <option value={""}>Choose one size</option>
          {data.size.map((sizeData, sizeIndex) => (
            <option key={sizeIndex} value={`${sizeData.name},${sizeData.price}`}
            >
              {sizeData.name} - {sizeData.description} - ₹ {sizeData.price}
            </option>
          ))}
        </select>
      </p>
      {!itemInCart(data._id)||findPizzaQuantity(data._id) === 0? (
      
      <button className='cart-btn' disabled={!data.price} style={{ cursor: data.price ? 'pointer' : 'not-allowed' }}
 onClick={()=>handleCart(data)} >Add to Cart</button>
  ) : ( 
    <div className='quantity-btn'>
    
    <button
  className='minus'
  onClick={() => {
    findPizzaQuantity(data._id) === 1
      ? removeFromCart(data._id)
      : handleSubtractingQuantity(data._id);
  }}
>
  <FaMinus />
</button>
    
  <p>{findPizzaQuantity(data._id)}</p>
  <button className='add'
  onClick={()=>handleAddingQuantity(data._id)}
  ><MdAdd/></button> 
 </div>
  )} 
    </section>
  ))}
  </section>
  </section>
   
   {/* NON-VEG? */}

   <section>
    <div className='menu-cart'>
  <h3 className='menu-heading' style={{backgroundColor:"red"}} id='non-veg' >Non-Veg</h3>

   
    </div>
  <section className='home-menu' >
  {nonVegMenu?.map((data, index) => (
    <section key={index} className='user-menu'>
      <img src={data.img} alt={data.name} />
      <p style={{fontWeight:"bolder"}}>{data.name}</p>
      <p>{data.description}</p>
      {console.log()}
      <p>₹ {findPizzaQuantity(data._id) ? data.price * findPizzaQuantity(data._id) : data.price} </p>
      <p>
        <select onChange={(e) =>  handleSizeChange(nonVegMenu,setNonVegMenu,data._id,e.target.value,
          setPizzaValue(e.target.value))}>
          <option value={""}>Choose one size</option>
          {data.size.map((sizeData, sizeIndex) => (
            <option key={sizeIndex} value={`${sizeData.name},${sizeData.price}`}
            >
              {sizeData.name} - {sizeData.description} - ₹ {sizeData.price}
            </option>
          ))}
        </select>
      </p>
      {!itemInCart(data._id)||findPizzaQuantity(data._id) === 0? (
      
      <button className='cart-btn' disabled={!data.price} style={{ cursor: data.price ? 'pointer' : 'not-allowed' }}
 onClick={()=>handleCart(data)} >Add to Cart</button>
  ) : ( 
    <div className='quantity-btn'>
    
    <button
  className='minus'
  onClick={() => {
    findPizzaQuantity(data._id) === 1
      ? removeFromCart(data._id)
      : handleSubtractingQuantity(data._id);
  }}
>
  <FaMinus />
</button>
    
  <p>{findPizzaQuantity(data._id)}</p>
  <button className='add'
  onClick={()=>handleAddingQuantity(data._id)}
  ><MdAdd/></button> 
 </div>
  )} 
    </section>
  ))}
  </section>
  </section>
   
  </div>)         
                  : 
  
  (

    // ALLPIZZA FILTERING 

<section>
  {filteredPizzas.length === 0 ? (
    <h3 className='no-pizzas'>Sorry ! No Pizza's Found Try Customization Below !</h3>
  ) : (
    <>
 <section>
  <h3 className='menu-heading' id='filtered-pizzas' >Search Results: </h3>
  
  <section className='home-menu' >
  {filteredPizzas?.map((data, index) => (
    <section key={index} className='user-menu'>
      <img src={data.img} alt={data.name} />
      <p style={{fontWeight:"bolder"}}>{data.name}</p>
      <p>{data.description}</p>
      {console.log()}
      <p>₹ {findPizzaQuantity(data._id) ? data.price * findPizzaQuantity(data._id) : data.price} </p>
      <p>
        <select onChange={(e) =>  handleSizeChange(allPizzas,setAllPizzas,data._id,e.target.value,
          setPizzaValue(e.target.value))}>
          <option value={""}>Choose one size</option>
          {data.size.map((sizeData, sizeIndex) => (
            <option key={sizeIndex} value={`${sizeData.name},${sizeData.price}`}
            >
              {sizeData.name} - {sizeData.description} - ₹ {sizeData.price}
            </option>
          ))}
        </select>
      </p>
      {!itemInCart(data._id)||findPizzaQuantity(data._id) === 0? (
      
      <button className='cart-btn' disabled={!data.price} style={{ cursor: data.price ? 'pointer' : 'not-allowed' }}
 onClick={()=>handleCart(data)} >Add to Cart</button>
  ) : ( 
    <div className='quantity-btn'>
    
    <button
  className='minus'
  onClick={() => {
    findPizzaQuantity(data._id) === 1
      ? removeFromCart(data._id)
      : handleSubtractingQuantity(data._id);
  }}
>
  <FaMinus />
</button>
    
  <p>{findPizzaQuantity(data._id)}</p>
  <button className='add'
  onClick={()=>handleAddingQuantity(data._id)}
  ><MdAdd/></button> 
 </div>
  )} 
    </section>
  ))}
  </section>
  </section>
    </>
    )}
    </section> 

  )}

  <section id='customize'> 
  <h3 className='order-heading'>Customize Your Desired Pizza !</h3>
  <section className='customize-container'>
    {/* crust */}
     <section className='crust'>
     <h4 className='order-heading'>Select Your Prefered Crust : </h4>
     
      {crustOptions?.map((item ,index)=>(
       <p key={index}>
       <input
        type='radio'
        name='crustOptions'
        value={item.name}
        onChange={()=>handleCrustChange(item)}
        checked={selectedCrust.name === item.name} 
        />
         &nbsp;&nbsp;
        {item.name}
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp; ₹ {item.price}
        </p>
      ))}
      
     </section>

 {/* sausage */}

     <section className='sausage'>
     <h4 className='order-heading'>Select Your Prefered Sausage : </h4>
         {sausageOptions?.map((item ,index)=>(
          <p key={index}>
          <input
           type='radio'
           name='sausageOptions'
           value={item.name}
           onChange={()=>handleSausageChange(item)}
           checked={selectedSausage.name === item.name} 
           />
            &nbsp;&nbsp;
           {item.name}
           <br />
           &nbsp;&nbsp;&nbsp;&nbsp; ₹ {item.price}
           </p>
         ))}
      
       
      
     </section>
      {/* cheese */}
      <section className='cheese'>
     <h4 className='order-heading'>Select Your Prefered Cheese : </h4>
     {cheeseOptions?.map((item ,index)=>(
       <p key={index}>
       <input
        type='radio'
        name='cheeseOptions'
        value={item.name}
        onChange={()=>handleCheeseChange(item)}
        checked={selectedCheese.name === item.name}
        />
         &nbsp;&nbsp;
        {item.name}
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp; ₹ {item.price}
        </p>
      ))}
       
      
     </section>

       {/* veggies */}
       <section className='veggies'>
     <h4 className='order-heading'>Select Your Prefered Vegetables (3 Free Veggies , Select ' 3 ' min) : </h4>
     {veggiesOptions?.map((item, index) => (
         <p key={index} className='veggies-checkbox'>
         <input
           type="checkbox"
           name="veggiesOptions"
           value={item.name}
           checked={selectedVeggies.some((selectedItem)=> selectedItem.name === item.name)}
           onChange={() => handleVeggiesChange(item)}
         />
          &nbsp;&nbsp;
         {item.name}
         <br />
         &nbsp;&nbsp;&nbsp;&nbsp; ₹ {item.price}
       </p>
     ))}
    
     </section>

        {/* meat */}

        <section className='meat'>
     <h4 className='order-heading'>Select Your Prefered Meat (1 Free Meat, Select ' 2 ' min) : </h4>
     {meatOptions?.map((item, index) => (
         <p key={index} className='meat-checkbox'>
          
         <input
           type="checkbox"
           name="meatOptions"
           value={item.name}
           checked={selectedMeats.some((selectedItem)=> selectedItem.name === item.name)}
           onChange={() => handleMeatChange(item)}
         />
         &nbsp;&nbsp;
         {item.name}
         <br />

          &nbsp;&nbsp;&nbsp;&nbsp; ₹ {item.price}
       </p>
     ))}
    
     </section>
    
     </section>

     <button disabled={!selectedCheese || !selectedCrust || !selectedSausage || selectedVeggies.length <= 2 || selectedMeats.length <= 1}   className='customize-cart' onClick={handleCustomizeOptions}>Add to Cart</button>
  </section>
   
  </main>
</>


  )
}

export default UsersHome