import React, { useContext, useEffect, useState } from 'react'
import api from '../api'
import DataContext from '../ContextApi/DataContext';
import { useNavigate } from 'react-router-dom';

const AdminsHome = () => {
  const {email,crustOptions,sausageOptions,cheeseOptions,veggiesOptions,meatOptions,} = useContext(DataContext);

  const navigate = useNavigate();

  const [menuOrders,setMenuorders] = useState([]);
  const handleMenuOrders = (menuOrders)=>{
   setMenuorders(menuOrders)
  }
    const [customizedOrders, setCustomizedOrders] = useState([]);
    const handleCustomizedOrders = (customizedOrders)=>{
      setCustomizedOrders(customizedOrders);
    }
    
    const [crustValue,setCrustValue] = useState(1);
    const [sausageValue,setSausageValue] = useState(1);
    const [cheeseValue,setCheeseValue] = useState(1);
    const [veggiesValue,setVeggiesValue] = useState(1);
    const [meatValue,setMeatValue] = useState(1);


    const canSaveCrust = Boolean(crustValue >= 1 && crustValue <= 20);

    const canSaveSausage = Boolean(sausageValue >= 1 && sausageValue <= 20);

    const canSaveCheese = Boolean(cheeseValue >= 1 && cheeseValue <= 20);

    const canSaveVeggies = Boolean(veggiesValue >= 1 && veggiesValue <= 20);

    const canSaveMeat = Boolean(meatValue >= 1 && meatValue <= 20);


var adminMail = JSON.parse(sessionStorage.getItem('adminMail'));


const {statusRefresh,setStatusRefresh,afterOrderRefresh,quantityRefresh,setQuantityRefresh} = useContext(DataContext);

    useEffect(()=>{
      const getAllOrder = async ()=>{
          try {
              const response = await api.get('admins/allorders')
             handleMenuOrders(response?.data.menuOrders);
             
             handleCustomizedOrders(response?.data.customizedOrders);
            
               } catch (error) {
              console.log(error)
          }
      }
     getAllOrder();
  },[statusRefresh,afterOrderRefresh])

  useEffect(()=>{
    handleQuantityAlert()
  },[crustName,sausageName,cheeseName,veggiesNames,meatNames])
 
 const filterPendingMenuOrders = menuOrders?.filter((item) => item.OrderStatus !== 'Order Served')

 const servedMenuOrder = menuOrders?.filter((item) => item.OrderStatus === 'Order Served')

 const filterPendingCustomizedOrders = customizedOrders?.filter((item) => item.OrderStatus !== "Order Served" )

 const servedCustomizedOrders = customizedOrders?.filter((item) => item.OrderStatus === "Order Served" )
 
  const handleMenuStatusChange = async (value,itemId) => {
    try {
      const response = await api.post('admins/updatestatus/menu',{newStatus:value,id:itemId});
       
      setStatusRefresh(!statusRefresh);
    } catch (error) {
      console.error(error)
    }
  };

  const handleCustomizedStatusChange = async (value,itemId) => {
    try {
      console.log(value,itemId)
      const response = await api.post('admins/updatestatus/customized',{newStatus:value,id:itemId});
       
      setStatusRefresh(!statusRefresh);
    } catch (error) {
      console.error(error)
    }

  }


  const handleItemsQuantity = async (adminMail,crustName,sausageName, cheeseName,veggiesNames,meatNames,)=>{
    try {
        const data = {
          adminMail,
          crustName,
          sausageName,
          cheeseName,
          veggiesNames,
          meatNames,
         }
             const response = await api.post('/admins/quantity/alert',data)
        console.log(response.data)
    } catch (error) {

      console.log(error);
      
    }
  }


//MAIN QUANTITY FUNCTION

var crustName; 
var sausageName;
var cheeseName;
var veggiesNames = [];
var meatNames = [];

  const handleQuantityAlert = async ()=>{
  
    console.log("im running");

  crustOptions.forEach((item) => {
    if (item.quantity <= 20) {
      crustName = item.name;
    }
  });

  sausageOptions.forEach((item) => {
    if (item.quantity <= 20) {
      sausageName = item.name;
    }
  });

  cheeseOptions.forEach((item) => {
    if (item.quantity <= 20) {
      cheeseName = item.name;
    }
  });

  veggiesOptions.forEach((item) => {
    if (item.quantity <= 20) {
      veggiesNames.push(item.name);
    }
  });

  meatOptions.forEach((item) => {
    if (item.quantity <= 20) {
      meatNames.push(item.name);
    }
  });


    if(adminMail && crustName && sausageName && cheeseName &&veggiesNames.length !== 0 && meatNames.length !== 0){
      await handleItemsQuantity(adminMail,crustName,sausageName,cheeseName,veggiesNames,meatNames)
    }
  }
let menuName ;
  const increaseQuantity = async (e,name,value,itemId,) => {
    try {

      if(value && itemId && name){
        const data = {
          value: value,
          id: itemId,
          name: name,
        }

        e.preventDefault();

        const response = await api.post('/admins/update/quantity',data)
       
        console.log(response);

        setQuantityRefresh(!quantityRefresh);
      }
      
    } 
    catch (error) {
      console.log(error);
    }
  
  }

  const handleAdminLogOut = () =>{
    
    sessionStorage.removeItem("adminMail");
      navigate("/admins/login");
  
  }
  return (
     <main>
      <header className='admin-header'>
        <h2 style={{ margin:"0 auto"}}>CHEESE-FACTROY  </h2>
        <button onClick={handleAdminLogOut}
        style={{margin:"1rem",padding:".5rem",backgroundColor:"#ccc",borderRadius:".7rem"}}
        >Log-out</button>
      </header>
       <h3 className='order-heading'  >Quantity Management : </h3>
      <section className='inventory-container'>  
       
        <section 
        className='customize-menu-container'>
           {/* CRUST */}

          <h4 className='order-heading'id='inventory'>Crust :</h4>
          <section className='customize-item-container'>

          {crustOptions?.map((item,index) => 
           
         <section key={index} className='customize-menu-item'>
        <p> Name: &nbsp;
        <strong>{item.name}</strong>
        </p>  
          <p> Price : &nbsp;
          <strong>{item.price}</strong>
          </p>
          <p> Quantity : &nbsp;
          <strong>{item.quantity}</strong>
          </p>

          <form onSubmit={(e)=>increaseQuantity(e,"crust",crustValue,item._id)}>
          <input 
          style={{borderRadius:".4rem",width:"100%",padding:".2rem 1rem",margin:".5rem 0",}}
          type='number'
          min="1" 
          max="20"
          maxLength="2"
          value={crustValue}
          onChange={(e)=>setCrustValue(e.target.value)}
          />
          <button style={{width:"100%",borderRadius:"1rem",padding:".2rem",backgroundColor:"#ffcc80"}} 
          type='submit'
          disabled={!canSaveCrust}
          
           >Add</button>
          </form>
          </section>
          
          )}
        </section>

        {/* SAUSAGE */}

        <h4 className='order-heading' id='inventory'>Sausage :</h4>

        <section className='customize-item-container'>

          {sausageOptions?.map((item,index) => 
           
         <section key={index} className='customize-menu-item'>
        <p> Name: &nbsp;
        <strong>{item.name}</strong>
        </p>  
          <p> Price : &nbsp;
          <strong>{item.price}</strong>
          </p>
          <p> Quantity : &nbsp;
          <strong>{item.quantity}</strong>
          </p>

          <form onSubmit={(e)=>increaseQuantity(e,"sausage",sausageValue,item._id)}>
          <input 
          style={{borderRadius:".4rem",width:"100%",padding:".2rem 1rem",margin:".5rem 0",}}
          type='number'
          min="1" 
          max="20"
          maxLength="2"
          value={sausageValue}
          onChange={(e)=>setSausageValue(e.target.value)}
          />
          <button style={{width:"100%",borderRadius:"1rem",padding:".2rem",backgroundColor:"#ffcc80"}} 
          type='submit'
          disabled={!canSaveSausage}
           >Add</button>
          </form>
          
          </section>
          )}
          </section>
    
          {/* CHEESE */}

<h4 className='order-heading' id='inventory'>Cheese :</h4>
        
        <section className='customize-item-container'>

          {cheeseOptions?.map((item,index) => 
           
         <section key={index} className='customize-menu-item'>
        <p> Name: &nbsp;
        <strong>{item.name}</strong>
        </p>  
          <p> Price : &nbsp;
          <strong>{item.price}</strong>
          </p>
          <p> Quantity : &nbsp;
          <strong>{item.quantity}</strong>
          </p>

          <form onSubmit={(e)=>increaseQuantity(e,"cheese",cheeseValue,item._id)}>
          <input 
          style={{borderRadius:".4rem",width:"100%",padding:".2rem 1rem",margin:".5rem 0",}}
          type='number'
          min="1" 
          max="20"
          maxLength="2"
          value={cheeseValue}
          onChange={(e)=>setCheeseValue(e.target.value)}
          />
          <button style={{width:"100%",borderRadius:"1rem",padding:".2rem",backgroundColor:"#ffcc80"}} 
          type='submit'
          disabled={!canSaveCheese}
           >Add</button>
          </form>
          
          </section>
          )}
          </section>

        {/* VEGETABLES */}

          <h4 className='order-heading' id='inventory'>Vegetables :</h4>
        
        <section className='customize-item-container'>

          {veggiesOptions?.map((item,index) => 
           
         <section key={index} className='customize-menu-item'>
        <p> Name: &nbsp;
        <strong>{item.name}</strong>
        </p>  
          <p> Price : &nbsp;
          <strong>{item.price}</strong>
          </p>
          <p> Quantity : &nbsp;
          <strong>{item.quantity}</strong>
          </p>

          <form onSubmit={(e)=>increaseQuantity(e,"veggies",veggiesValue,item._id)}>
          <input 
          style={{borderRadius:".4rem",width:"100%",padding:".2rem 1rem",margin:".5rem 0",}}
          type='number'
          min="1" 
          max="20"
          maxLength="2"
          value={veggiesValue}
          onChange={(e)=>setVeggiesValue(e.target.value)}
          />
          <button style={{width:"100%",borderRadius:"1rem",padding:".2rem",backgroundColor:"#ffcc80"}} 
          type='submit'
          disabled={!canSaveVeggies}
           >Add</button>
          </form>
          
          </section>
          )}
          </section>

         {/* MEAT  */}

          <h4 className='order-heading' id='inventory'>Meat's:</h4>
        
        <section className='customize-item-container'>

          {meatOptions?.map((item,index) => 
           
         <section key={index} className='customize-menu-item'>
        <p> Name: &nbsp;
        <strong>{item.name}</strong>
        </p>  
          <p> Price : &nbsp;
          <strong>{item.price}</strong>
          </p>
          <p> Quantity : &nbsp;
          <strong>{item.quantity}</strong>
          </p>
          
          <form onSubmit={(e)=>increaseQuantity(e,"meat",meatValue,item._id)}>
          <input 
          style={{borderRadius:".4rem",width:"100%",padding:".2rem 1rem",margin:".5rem 0",}}
          type='number'
          min="1" 
          max="20"
          maxLength="2"
          value={meatValue}
          onChange={(e)=>setMeatValue(e.target.value)}
          />
          <button style={{width:"100%",borderRadius:"1rem",padding:".2rem",backgroundColor:"#ffcc80"}} 
          type='submit'
          disabled={!canSaveMeat}
           >Add</button>
          </form>

          </section>
          )}
          </section>
        </section>

         </section>


      <section>

        {/* PENDING MENU ORDERS */}

         <>
         <h3 className='order-heading'>Pending-Menu-Orders :</h3>
         {filterPendingMenuOrders?.length === 0 ? (<h3 style={{textAlign:"center"}}>No Pending Menu Orders To Show</h3>):(
         <section className='ordered-item-container'>
         {filterPendingMenuOrders.map((item,index)=>
         <section key={index} className='ordered-item'>
         <p>{Array.isArray(item.name) ? (item.name.join(", ")) : (item.name)}</p>

            <p>{Array.isArray(item.size) ? (item.size.join(", ")) : (item.size)}</p>

            <p> ₹ {Array.isArray(item.price) ? (item.price.join(", ")) : (item.price)}</p>

            <p>Quantity: {Array.isArray(item.quantity) ? (item.quantity.join(", ")) : (item.quantity)}</p>
            

            <p>Via: {Array.isArray(item.via) ? (item.via.join(", ")) : (item.via)}</p>
            <p>Total: {item.total}</p>
            <p>Ordered-At: {item.orderedAt}</p>
            
            <h2 
            style={{color:"green",marginTop:"1rem",backgroundColor:"white",
            padding:".5rem", borderRadius:"1rem"}}> 
            
            <label>Select Order Status: </label>
        <br />
        <select style={{fontSize:'1rem',padding:'.5rem', margin:".5rem",borderRadius:'.4rem',fontWeight:'bold'}} value={item.OrderStatus}  onChange={(e)=>handleMenuStatusChange(e.target.value,item._id)}>
          <option value={"Sent To Kitchen"}>Sent to Kitchen</option>
          <option value={"Order Ready"}>Order Ready</option>
          <option value={"Order Served"}>Order Served</option>
        </select>
            
            </h2>

            
         </section>
         
         )}
            </section>
            )}
            </>
        
      {/* {  SERVED MENU ORDERS} */}

         <>
        
       <h3 className='order-heading'>Served-Menu-Orders :</h3>
       {servedMenuOrder?.length === 0 ? (<h3 style={{textAlign:"center"}}>
        No Served  Orders to Show
       </h3>) : (
        <section className='ordered-item-container'>
         {servedMenuOrder?.map((item,index)=>
         <section key={index} className='ordered-item'>
         <p>{Array.isArray(item.name) ? (item.name.join(", ")) : (item.name)}</p>

            <p>{Array.isArray(item.size) ? (item.size.join(", ")) : (item.size)}</p>

            <p> ₹ {Array.isArray(item.price) ? (item.price.join(", ")) : (item.price)}</p>

            <p>Quantity: {Array.isArray(item.quantity) ? (item.quantity.join(", ")) : (item.quantity)}</p>
            

            <p>Via: {Array.isArray(item.via) ? (item.via.join(", ")) : (item.via)}</p>
            <p>Total: {item.total}</p>
            <p>Ordered-At: {item.orderedAt}</p>
            
            <h2 
            style={{color:"green",marginTop:"1rem",backgroundColor:"white",
            padding:".5rem", borderRadius:"1rem"}}> 
            
            <label>Order Status: </label>
        <br />
        <select style={{fontSize:'1rem',padding:'.5rem', margin:".5rem",borderRadius:'.4rem',fontWeight:'bold'}} >
          <option>Order Served</option>
        </select>
            
            </h2>

            
         </section>
         
         )}
            </section>
               )}
          
           </>
         
{/* PENDING CUSTOMIZED ORDERS  */}
           <section className='customized-container-main'>
  <h3 className='order-heading'>Pending Customized Orders : </h3>

  {filterPendingCustomizedOrders?.length === 0 ? (
    <h3 style={{ textAlign: "center" }}>No Pending Customized Orders To Show</h3>
  ) : (
    <section className='customized-items-container'>
      {filterPendingCustomizedOrders?.map((item, index) => (
        <section className='customize-item' key={index} >
          <p>Selected Crust: {item.selectedCrust.name}</p>
          <p>Selected Sausage: {item.selectedSausage.name}</p>
          <p>Selected Cheese: {item.selectedCheese.name}</p>
          <p>Selected Vegetables (3 Free!): {item.selectedVeggies.map((it) => it.name).join(" , ")}</p>
          <p>Selected Meats (1 Free!): {item.selectedMeats.map((it) => it.name).join(" , ")}</p>
          <p>Paid Amount: ₹ {item.newTotal}</p>

          <h2 
            style={{color:"green",marginTop:"1rem",backgroundColor:"white",
            padding:".5rem", borderRadius:"1rem",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            width:"max-content",
            margin:"1rem auto"

            }}> 
            
            <label>Select Order Status: </label>
        <br />
    <select style={{fontSize:'1rem',    padding:'.5rem', margin:".5rem",  borderRadius:'.4rem',  fontWeight:'bold'}} value={item. OrderStatus}
          onChange={(e)=>handleCustomizedStatusChange(e.target.value,item._id)}>
          <option value={"Sent To Kitchen"}>Sent to Kitchen</option>
          <option value={"Order Ready"}>Order Ready</option>
          <option value={"Order Served"}>Order Served</option>
        </select>
            
            </h2>
        </section>
      ))}
    </section>
  )}
</section>

{/* SERVED CUSTOMIZED ORDERS  */}

<section className='customized-container-main'>
  <h3 className='order-heading'>Served Customized Orders : </h3>

  {servedCustomizedOrders?.length === 0 ? (
    <h3 style={{ textAlign: "center" }}>No Served Customized Orders To Show</h3>
  ) : (
    <section className='customized-items-container'>
      {servedCustomizedOrders?.map((item, index) => (
        <section className='customize-item' key={index} >
          <p>Selected Crust: {item.selectedCrust.name}</p>
          <p>Selected Sausage: {item.selectedSausage.name}</p>
          <p>Selected Cheese: {item.selectedCheese.name}</p>
          <p>Selected Vegetables (3 Free!): {item.selectedVeggies.map((it) => it.name).join(" , ")}</p>
          <p>Selected Meats (1 Free!): {item.selectedMeats.map((it) => it.name).join(" , ")}</p>
          <p>Paid Amount: ₹ {item.newTotal}</p>

          <h2 
            style={{color:"green",marginTop:"1rem",backgroundColor:"white",
            padding:".5rem", borderRadius:"1rem",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            width:"max-content",
            margin:"1rem auto"

            }}> 
            
            <label>Select Order Status: </label>
        <br />
        <select style={{fontSize:'1rem',padding:'.5rem', margin:".5rem",borderRadius:'.4rem',fontWeight:'bold'}} >
          {/* <option value={"Sent To Kitchen"}>Sent to Kitchen</option>
          <option value={"Order Ready"}>Order Ready</option> */}
          <option >Order Served</option>
        </select>
            
            </h2>
        </section>
      ))}
    </section>
  )}
</section>
      </section>
      
     </main>
  )

}

export default AdminsHome