import React, { useContext, useEffect } from 'react'
import DataContext from '../ContextApi/DataContext'
import api from '../api'
import { Link } from 'react-router-dom';
 
const Orders = () => {
    
    const { userOrders,handleSetUserOrders,statusRefresh,userCustomizedOrders, handleUserCustomizedOrders} = useContext(DataContext)

     

    useEffect(()=>{
        console.log("im refreshing");
        const getOrder = async ()=>{
            try {
                const userMail = localStorage.getItem('email');
                
                const response = await api.post('users/orders',{email:userMail})

                
                    handleSetUserOrders(response.data.orders ? response.data.orders : []);

                    handleUserCustomizedOrders(response?.data.customizedOrders);

                    const responseAll = await api.get('admins/allorders')
                    console.log(responseAll?.data.menuOrders);
                      
            } catch (error) {
                console.log(error)
            }
        }
       getOrder();
    },[statusRefresh])

  

    if(userOrders && userOrders?.length > 1)
     {var sortedMenuOrders = userOrders.sort((a,b)=>{
        return b.orderedAt.localeCompare(a.orderedAt)
     })
     }

     
    if(userCustomizedOrders && userCustomizedOrders?.length >= 1)
    { var sortedCustomizedOrders = userCustomizedOrders.sort((a,b)=>{
       return b.orderedAt.localeCompare(a.orderedAt)
    })
    }

       
  return (
    <main>
 <>
  
    {userOrders?.length === 0 ?
    (
        <div className='order-empty'>
    <h3>Sorry, No New/Previous Orders ! Add Some Hot Cheessy Pizza !</h3>
    <h3>
        <Link to='/users/home'style={{marginRight:'1rem'}}>Home</Link>
        <Link to='/users/cart'>Cart</Link>
    </h3>
    
    </div>
    ):(
    <>
    <div style={{marginLeft:'1rem',marginTop:'1rem'}}>
    <h3>
        <Link to='/users/home'style={{marginRight:'1rem'}}>Home</Link>
        <Link to='/users/cart'>Cart</Link>
    </h3>

    </div>
    <h3 className='order-heading' >My Menu Order </h3>
    <section className='ordered-item-container'>

    
    {userOrders?.map((item,index)=>(
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
            padding:".5rem", borderRadius:"1rem"}}>Order-Status: {item.OrderStatus}</h2>
             
        </section>
    
       
    ))}
    </section>
     </>
     )}

<>
<h4 className='order-heading'>MY Customized Orders</h4>
<section className='customize-options'>
 
 {userCustomizedOrders?.map((item,index)=>(
  
     <section   className='customize-item'
     key={index}
     >
        
       <p>Selected Crust : {item.selectedCrust.name}</p> 

       {/* <p>Price: ₹ {item.selectedCrust.price}</p> */}
 
       <p>Selected Sausage : {item.selectedSausage.name}</p>

       {/* <p>Price  ₹ {item.selectedSausage.price}</p> */}
 
       <p>Selected Cheese : {item.selectedCheese.name}</p>

       {/* <p>Price  ₹ {item.selectedCheese.price}</p> */}
 
       
       <p>Selected Vegetables ( 3 Free !) : {item.selectedVeggies.map((it) =>it.name).join(" , ")}</p>

       {/* <p>Price  ₹ {item.selectedVeggies.map((it)=>it.price).join(" , ")}</p> */}
 
       <p>Selected Meats (1 Free !) : {item.selectedMeats.map((it)=> it.name).join(" , ")}</p>

       {/* <p>Price  ₹ {item.selectedMeats.map((it)=> it.price).join(" , ")}</p> */}
 
 <p> Amount : ₹ {item.newTotal} </p>

 <p>Ordered-At: {item.orderedAt}</p>
 <p
 style={{color:"green",marginTop:"1rem",backgroundColor:"white",
 padding:".5rem", borderRadius:"1rem",fontSize:"1.5rem",textAlign:"center"}}
 >Order-Status :  {item.orderStatus}</p>
   {console.log(item)}
 </section>
  ))}
  
 </section>
     </>
 </>
    </main>
    
  )
}

export default Orders