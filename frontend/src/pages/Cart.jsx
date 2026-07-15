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

  return (
    <div>

      <h1>My Cart</h1>

      {cartItems.map((item) => (

        <div key={item.product_id}>

          <h3>{item.name}</h3>

          <p>Price: ₹{item.price}</p>

          <p>Quantity: {item.quantity}</p>

          <p>Total :₹{item.price * item.quantity} </p> 

          <hr />

        </div>

      ))}

    </div>
  );
}

export default Cart;