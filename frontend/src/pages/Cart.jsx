import { useEffect, useState } from "react";
import API from "../api/axios";

function Cart() {

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

  const totalAmount = cartItems.reduce ( 
    (total , item ) => total+ item.price * item.quantity,0
  );

  return (
    <div>

      <h1>My Cart</h1>

      {cartItems.map((item) => (

        <div key={item.id}>

          <h3>{item.name}</h3>

          <p>Price: ₹{item.price}</p>

          <p>Quantity: {item.quantity}</p>

          <p>Total :₹{item.price * item.quantity} </p> 

          <button onClick = {() => removeItem(item.id)}>
            REMOVE
          </button>

          <hr />
          
        </div>
        

      ))}
      <h2>Grand Total : ₹{totalAmount}</h2>

      <h2>Items : {cartItems.length}</h2>

    </div>
  );
}

export default Cart;