import { useNavigate , Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

function Cart() {
  const navigate = useNavigate();

  

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCartItems(res.data.cart);

    } catch(error) {
      console.log(error);
    }
  };

  const updateQuantity = async (cartId, newQuantity) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.put(`/cart/${cartId}` , {
        quantity : newQuantity
      } , {
        headers : {
          Authorization : `Bearer ${token}`
        }
      });

      console.log(res.data);

      fetchCart();

      
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to update quantity ");
    }
  };

  const removeItem = async(cartId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.delete(`/cart/${cartId}`, {
        headers : {
          Authorization : `Bearer ${token}`
        }
      });

      alert(res.data.message);

      fetchCart();

    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = async () =>{
    try {
      const token = localStorage.getItem("token");
      const res = await API.post("/orders/checkout", {} , {
        headers : {
          Authorization : `Bearer ${token}`
        }
      });
      alert(" Thank you for your purchase");

      navigate("/orders");


      


    } catch (error) 
    {
      console.log(error);

      alert( error.response?.data?.message || "CheckOut Failed");

    }
  };

  const totalAmount = cartItems.reduce ( 
    (total , item ) => total+ item.price * item.quantity,0
  );

  return (
    <div>

      <h1>My Cart</h1>
      {cartItems.length === 0 ? (
        <div> 
          <h2>Your Cart is Empty </h2>
          <p>Start Shopping and  add some product </p>
          <Link to = "/" >
          <button>Continue Shopping </button>
          </Link>
        </div>
      ) : (
        cartItems.map((item)  => (
          <div key = {item.id}>
            <h3>{item.name}</h3>

            <p>Price :₹{item.price} </p>
          <div>
          <button onClick = {() => updateQuantity(item.id, Math.max(1, item.quantity -1))}>
            -
          </button>

          <span> {item.quantity}</span>

          <button onClick = {() => updateQuantity(item.id , item.quantity+1)}>
            +
          </button>
          </div>
          <p> 
            Total :₹{item.price * item.quantity} 
          </p>
          <button onClick={() => removeItem(item.id)}>
            Remove
          </button>
          <hr/>
          </div>
        ))
      )}
      <h2>Grand Total : ₹{totalAmount}</h2>

      <h2>Items : {cartItems.length}</h2>
      <button onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );

}

export default Cart;