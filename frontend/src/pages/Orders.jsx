import { useEffect, useState } from "react";
import API from "../api/axios";
function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setOrders(res.data.orders);

    } catch(error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>My Orders</h1>

      {orders.map((order) => (
        <div key={order.id}>
          <h3>Order #{order.id}</h3>
          <p>Total: ₹{order.total_amount}</p>
          <p>Date: {order.created_at}</p>
          <hr />
        </div>
      ))}
      <h2> Total Orders : { orders.length} </h2>
    </div>
  );
}

export default Orders;