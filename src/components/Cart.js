import React, { useContext, useEffect } from 'react'
import DataContext from '../ContextApi/DataContext'
import { MdDelete } from "react-icons/md";
import { GiFullPizza } from 'react-icons/gi'
import { Link} from 'react-router-dom';
import { FaMinus
 } from 'react-icons/fa';
 import { MdAdd } from 'react-icons/md';
 import { FaHotjar } from 'react-icons/fa';
 

  

const Cart = () => {
    const { cart,setCart,customizeCart,setCustomizeCart,findPizzaQuantity,handleSubtractingQuantity,handleAddingQuantity,removeFromCart,cartTotal,handleOrder,setRefresh,refresh,afterOrderRefresh,handleFinalPrice} = useContext(DataContext)
 
  
    useEffect(() => {
         try {
          var storedCart = JSON.parse(sessionStorage.getItem('cartData'));

if(storedCart && storedCart.length !== 0   ){
           setCart(storedCart)  
      }  else {
        setCart([]);
      }
 
      var customizeData = JSON.parse(sessionStorage.getItem('customizeData'))
 
      if(customizeData && customizeData.length !== 0){
       
       setCustomizeCart(customizeData);
       
        
      }else{
          setCustomizeCart([]);
      }
         
         } catch (error) {
          console.log(error);
         }
     
      
      }, [refresh,afterOrderRefresh]);
  
 



     const handleDeleteCustomize = (id) => {
      
      var customizeData = JSON.parse(sessionStorage.getItem('customizeData'))

      const newCustomizeData = customizeData.filter((item)=> item.randomId !== id)

      sessionStorage.setItem('customizeData', JSON.stringify(newCustomizeData));
        
       setRefresh(!refresh)
     }

     var finalPayable = 0;
      const finalPrice = () => {
        try {
          finalPayable = isNaN(cart) 
          ? (isNaN(customizeCart) ? Number(cartTotal()) + customizeCart.reduce((acc,value)=> acc +  value.newTotal, 0 ) : cartTotal())
          : customizeCart.reduce((acc,value)=> acc +  value.newTotal, 0 )

          sessionStorage.setItem('finalTotal',JSON.stringify(finalPayable))

          return finalPayable;

        } catch (error) {
          console.log(error);
        }
         
      }
  
        

  return (
    <main className='cart-div'>
      {cart?.length === 0 && customizeCart?.length === 0 ? (
        <div className='cart-empty-main'>
    <section className='cart-empty' style={{height:"max-content"}} >
    <h2>Your Cart is Empty, Please Add Pizza's &nbsp; <GiFullPizza/> </h2>
    <h2>
    <Link to='/users/orders' style={{color:"black"}}> Orders</Link>
    </h2>

    <h2><Link to='/users/home' style={{color:"black"}}>Home</Link></h2>
    
            
    </section>
    </div>
    ) :
    (
      <>
    <section className='cart-1st'>
    <h3 className='menu-heading' id='cart' >My Cart </h3>
    <h3 className='menu-heading'>

      <Link to='/users/home' style={{color:"black",marginRight:'1rem'}}>Home</Link>
      
      <Link to='/users/orders' style={{color:"black"}}><FaHotjar/> Orders</Link>

      </h3>
      <h3 className='order-heading'>Menu Pizza's &nbsp; : </h3>
      {cart?.length === 0 ? (<h2>Your Menu Cart is Empty, Please Add Pizza's &nbsp; <GiFullPizza/> </h2>):(
    <section className='home-menu' >
    {cart?.map((data, index) => (
      <section key={index} className='user-menu'>
        <img src={data.img} alt={data.name} />
        <p style={{fontWeight:"bolder"}}>Name: {data.name}</p>
        <p>Size: {data.size}</p>
        <p>via: {data.via}</p>
        <p>₹ {findPizzaQuantity(data._id) ? data.price * findPizzaQuantity(data._id) : data.price} </p>
        <p> quantity : {data.quantity}</p>
        
        <div className='cart-quantity-btn'>

        <button
        className='minus'
        style={{fontSize:"large"}}
        onClick={() => {
          findPizzaQuantity(data._id) === 1
            ? removeFromCart(data._id)
            : handleSubtractingQuantity(data._id);
        }}
      >
        <FaMinus />
      </button>
        
        <button className='cart-delete-btn'   onClick={()=>removeFromCart(data._id)} ><MdDelete style={{fontSize:"large"}}/></button>
        
        <button className='add'
        style={{fontSize:"large"}}
        onClick={()=>handleAddingQuantity(data._id)}
        ><MdAdd/></button>
        </div>

      </section>
    ))}
    </section>
    )}
    
<section className='customize-cart-container'>
<h3 className='order-heading'>Customized Pizza's &nbsp; :</h3>
{customizeCart?.length === 0 ? (
       <h2>Your Customize Cart is Empty, Please Add Pizza's &nbsp; <GiFullPizza/> </h2>
        
    ):(
      
<section className='customize-options'>
 
{customizeCart.map((item,index)=>(
 
    <section   className='customize-item'
    key={index}
    >
       
      <p>Selected Crust : {item.selectedCrust.name}</p> 
      <p>Price: ₹ {item.selectedCrust.price}</p>

      <p>Selected Sausage : {item.selectedSausage.name}</p>
      <p>Price  ₹ {item.selectedSausage.price}</p>

      <p>Selected Cheese : {item.selectedCheese.name}</p>
      <p>Price  ₹ {item.selectedCheese.price}</p>

      
      <p>Selected Vegetables ( 3 Free !) : {item.selectedVeggies.map((it) =>it.name).join(" , ")}</p>
      <p>Price  ₹ {item.selectedVeggies.map((it)=>it.price).join(" , ")}</p>

      <p>Selected Meats (1 Free !) : {item.selectedMeats.map((it)=> it.name).join(" , ")}</p>
      <p>Price  ₹ {item.selectedMeats.map((it)=> it.price).join(" , ")}</p>

<p> Amount : ₹ <span style={{textDecoration:"line-through"}}>
  {item.total}
    </span> &nbsp; - 210 &nbsp; ₹ {item.newTotal} </p>
  <button style={{fontSize:"1.5rem"}} onClick={()=>handleDeleteCustomize(item.randomId)}><MdDelete/></button>
</section>
 ))}
 
</section>
    
    )}
    </section>
</section>
     
<section className='total-sec' style={{margin:"1rem"}}>

<h3>Total: ₹ {
 finalPrice()
} 
 </h3>

    

  <button onClick={handleOrder}>Place Order</button>
</section>
      </>
  )}

  </main>
  )
  
}
 
export default Cart ;