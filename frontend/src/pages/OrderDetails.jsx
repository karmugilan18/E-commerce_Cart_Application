import {useEffect , useState } from "react";
import {useParams}  from "react-router-dom";
import API from "../api/axios";

function OrderDetails() {
    const {id} = useParams();

    const [order, setOrder] = useState(null);
    const [items , setItems] = useState([]);


    useEffect(() =>
    {
        fetchOrderDetails();

    } , [id]);

    const fetchOrderDetails = async() => {
        try {
            const token = localStorage.getItem("token");

            const res = await API.get(`/orders/${id}` , {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            });

            setOrder(res.data.order);
            setItems(res.data.items);
        } catch (error) 
        {
            console.log(error);

        }
    };

    const totalItems = items.reduce( 
        (sum, item) => sum+ item.quantity, 0
    );
    if(!order)
    {
        return <h2>Loading....</h2>;
    }

    return (
        <div> 
            <h1> Order #{order.id}</h1>
            <p> Total : ₹{order.total_amount}</p>
            <p> Date : {new Date (order.created_at).toLocaleString()}</p>
            <hr/>
            <h2> Products</h2>
            {items.map((item,index) => (
                <div key = {index}>
                    <h3>{item.name}</h3>
                    <p> Price : ₹{item.price}</p>
                    <p>Quantity : {item.quantity}</p>

                    <p>
                        Subtotal:₹
                        {Number(item.price) * item.quantity}
                    </p>
                    <hr/>
                </div>
            ))}
            <h2> Total Items: {totalItems}</h2>
            <h2>Grand Total :₹{order.total_amount} </h2>
        </div>
    );
};

export default OrderDetails;
