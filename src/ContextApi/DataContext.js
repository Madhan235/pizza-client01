import { createContext, useEffect, useState } from "react"
import api from "../api";
import { json, useNavigate } from "react-router-dom";



 const DataContext = createContext({})

 export const DataProvider = ({children}) => {

  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("");
  const [isloading, setIsLoading] = useState(false)
  const [render , setRender] = useState(false);
  
  const [deliveryOption,setDeliveryOption] = useState("delivery");
  const [search , setSearch] = useState("")

  const [recommendedMenu, setRecommendedMenu] = useState([]);
//DEFALUT MENU STATE
   const [vegMenu ,setVegMenu] = useState([]);
   const [nonVegMenu , setNonVegMenu] = useState([]);
   const [allPizzas,setAllPizzas] = useState([]);

//COUSTMISE MENU STATE

const [crustOptions,setCrustOptions] = useState([])
 const [sausageOptions,setSausageOptions] = useState([]);
 const [cheeseOptions,setCheeseOptions] = useState([])
 const [veggiesOptions,setVeggiesOptions] = useState([]);
 const [meatOptions,setMeatOptions] = useState([]);

   let [cart,setCart] = useState([]);
     
    const [refresh,setRefresh] = useState(false);
const [pizzaValue,setPizzaValue] = useState("")
const [afterOrderRefresh,setAfterOrderRefresh] = useState(false);

const [menuOrders,setMenuorders] = useState([]);
  const handleMenuOrders = (menuOrders)=>{
   setMenuorders(menuOrders)
  }
    const [customizedOrders, setCustomizedOrders] = useState([]);
    const handleAllCustomizedOrders = (customizedOrders)=>{
      setCustomizedOrders(customizedOrders);
    }
    

const [userOrders,setUserOrders] = useState([]);

const [statusRefresh,setStatusRefresh] = useState(false);

const handleSetUserOrders = (orderArr) =>{
  setUserOrders(orderArr);
}

const [customizeCart,setCustomizeCart] = useState([]);

 

const [userCustomizedOrders,setUserCustomizedOrders] = useState([]);

const handleUserCustomizedOrders = (customizedOrders) => {
  setUserCustomizedOrders(customizedOrders)
}

const [quantityRefresh,setQuantityRefresh] = useState(false);
 
const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { "token": localStorage.getItem("token") };
        const response = await api.post('/users/home', {}, { headers });


        setRecommendedMenu(response?.data.recommended);
        setVegMenu(response?.data.veg);
        setNonVegMenu(response?.data.nonVeg)
        setAllPizzas(response?.data.allMenu)

// COUSTMIZE
        
        setCrustOptions(response?.data.crust)
        setSausageOptions(response?.data.sausage)
        setCheeseOptions(response?.data.cheese)
        setVeggiesOptions(response?.data.veggies)
        setMeatOptions(response?.data.meat)

      } catch (error) {
        console.error(error);
      }
    };
    
      fetchData();
    
  }, [quantityRefresh]);

   
 
  const handleAddingQuantity = (itemId) => {
    if (cart?.length !== 0) {
        const cartData = JSON.parse(sessionStorage.getItem('cartData'));
        
      const updatedCart = cartData.map((item) => item._id === itemId ? {...item, quantity: Number(item.quantity + 1)}: (item)) 
        sessionStorage.setItem('cartData', JSON.stringify(updatedCart));
        setRefresh(!refresh);
    }
};

const handleSubtractingQuantity = (itemId) => {
  if (cart?.length !== 0) {
      const cartData = JSON.parse(sessionStorage.getItem('cartData'));

      const updatedCart = cartData?.map((item) =>
          item._id === itemId ? { ...item, quantity: Math.max(Number(item.quantity) - 1, 0) } : item
      );

      sessionStorage.setItem('cartData', JSON.stringify(updatedCart));
      setRefresh(!refresh);
  }
};

 
    const findPizzaQuantity = (itemId) => {
      if(cart?.length !== 0){
        const cartData = JSON.parse(sessionStorage.getItem('cartData'));

      const foundItem = cartData?.find((item) => item._id === itemId);
      return foundItem ? Number(foundItem.quantity) : 1;}
      
     }

     const removeFromCart = (itemId) => {
    
      if(cart?.length !== 0){
        const cartData = JSON.parse(sessionStorage.getItem('cartData'));

      
      const updatedCart = cartData?.filter((item) => item._id !== itemId && item.quantity >= 0);
      sessionStorage.setItem('cartData', JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };

  const cartTotal = () => {
    let total = 0;
    const cartData = JSON.parse(sessionStorage.getItem('cartData'));

    const CartAmount = cartData?.reduce((accumulator, item) => {
        return cartData.length != 0 ?accumulator += Number(item.price) * item.quantity : 0;
    }, 0);

    return CartAmount;
}

const handleCustomizedQuantity = async ()=>{
  try {
    
    var customizeData = JSON.parse(sessionStorage.getItem('customizeData'));

    const response = await api.post('/users/quantityupdate',{customizeData : customizeData});

    setQuantityRefresh(!quantityRefresh);
             
  } catch (error) {
    console.log(error);
  }
}
 
   const handleOrder = async ()=>{
    try {
    
    
     let payingPrice = JSON.parse(sessionStorage.getItem('finalTotal'));


      const response = await api.post('users/create-order',{amount:payingPrice})
      
 
      if (response.data.amount && response.data.id) {
        handlePayment(response);
      } else {
        console.error('Invalid response from create-order API:', response);
      }

    } catch (error) {
      console.error(error);
    }

   }

   const handlePayment = (response)=>{
const options = {
   key:'rzp_test_9KSjPndjtyihYu',
   amount:  response.data.amount,
   currency: 'INR',
   order_id:  response.data.id,
   name:'Cheese Factory',
   description:'Purchase',

   //payNow onclick function
   handler: async (response)=>{
      try {

        let cartData = JSON.parse(sessionStorage.getItem('cartData'));

        const userMail = localStorage.getItem('email');
        
        const timeAndDate = new Date().toLocaleString();

        const totalAmount = cartTotal();

        var customizeData = JSON.parse(sessionStorage.getItem('customizeData'));

         

      var verifyPay;

        if(cartData.length === 0 && customizeData ){
          
          verifyPay = await api.post('users/verify', {
            ...response,
             customizeData: customizeData
          });
        } 
        else if(cartData.length >= 1 && customizeData.length >= 1){

          var newObj = [];

          var names = cartData.map((item)=>item.name);
          var size = cartData.map((item)=>item.size);
          var img = cartData.map((item)=>item.img);
          var price = cartData.map((item)=>item.price);
          var quantity = cartData.map((item)=>item.quantity);

           newObj = [{email:userMail,name:names,img:img,quantity:quantity,size:size,
            price:price,
            via:deliveryOption,
            orderedAt:timeAndDate,total:totalAmount,
          OrderStatus:"Sent To Kitchen"}]

            verifyPay = await api.post('users/verify', {
            ...response,
              cart: newObj,
             customizeData: customizeData,
          });

       }else if(cartData.length === 1 && customizeData.length >= 1){

        var newObj = [];

        let singleObj = cartData[0];

          delete singleObj._id;

          var newObj = [{...singleObj,
            email:userMail,orderedAt:timeAndDate,total:totalAmount,
          OrderStatus:"Sent To Kitchen"}]


         verifyPay = await api.post('users/verify', {
          ...response,
            cart: newObj,
            customizeData: customizeData,
        });

     }else if(cartData.length >= 1 && customizeData.length === 0){

      var newObj = [];

      var names = cartData.map((item)=>item.name);
      var size = cartData.map((item)=>item.size);
      var img = cartData.map((item)=>item.img);
      var price = cartData.map((item)=>item.price);
      var quantity = cartData.map((item)=>item.quantity);

       newObj = [{email:userMail,name:names,img:img,quantity:quantity,size:size,
        price:price,
        via:deliveryOption,
        orderedAt:timeAndDate,total:totalAmount,
      OrderStatus:"Sent To Kitchen"}]

        verifyPay = await api.post('users/verify', {
        ...response,
          cart: newObj,
      });

        }else if(cartData.length === 1 && customizeData.length === 0){

          var newObj = [];

          let singleObj = cartData[0];

            delete singleObj._id;

            var newObj = [{...singleObj,
              email:userMail,orderedAt:timeAndDate,total:totalAmount,
            OrderStatus:"Sent To Kitchen"}]


          verifyPay = await api.post('users/verify', {
            ...response,
              cart: newObj,
          });

      }

       
         
       if(verifyPay.status === 200)  {
         
        
        handleCustomizedQuantity();

          cartData = [];
          sessionStorage.setItem('cartData', JSON.stringify(cartData));
 
          var payingPrice = 0;
          sessionStorage.setItem("finalTotal",JSON.stringify(payingPrice));

          customizeData = [];
          sessionStorage.setItem('customizeData', JSON.stringify(customizeData));

        setStatusRefresh(!refresh);

          setTimeout(()=>{
            navigate("/users/orders")
          },1500)

         
          
        }

      } catch (error) {
        console.log(error);
      }
   },
   prefill: {
    name: email.slice(0,6),
    email: email,
    contact: '1234567890'
  },
  theme: {
    color: '#3399cc',
  },

};
const rzp = new window.Razorpay(options);
rzp.open();

   }
 
   
  
  const DataValue = {email,setEmail,password,setPassword,error,setError,isloading,setIsLoading,render,setRender,recommendedMenu,setRecommendedMenu,deliveryOption,setDeliveryOption,search,setSearch, vegMenu,setVegMenu,nonVegMenu,setNonVegMenu,allPizzas,setAllPizzas,cart,setCart,handleAddingQuantity,findPizzaQuantity,refresh,setRefresh,handleSubtractingQuantity,removeFromCart,pizzaValue,setPizzaValue,cartTotal,handleOrder,afterOrderRefresh,setAfterOrderRefresh,userOrders,handleSetUserOrders,statusRefresh,setStatusRefresh,crustOptions,setCrustOptions,sausageOptions,setSausageOptions,cheeseOptions,setCheeseOptions,veggiesOptions,setVeggiesOptions,meatOptions,setMeatOptions,
    customizeCart,setCustomizeCart,userCustomizedOrders,handleUserCustomizedOrders,
    menuOrders,
 handleMenuOrders,
customizedOrders,
handleAllCustomizedOrders,
    quantityRefresh,setQuantityRefresh}

  return (
    <DataContext.Provider 
    value={DataValue}
    >
 {children}
    </DataContext.Provider>
  )
 } 
 
export default DataContext
