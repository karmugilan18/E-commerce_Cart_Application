import {useEffect , useState } from "react";
import {useParams}  from "react-router-dom";
import API from "../api/axios";

function OrderDetails() {
    const {id} = useParams();

    const [order, setOrder] = useState(null);

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
        } catch (error) 
        {
            console.log(error);

        }
    };
    if(!order)
    {
        return <h2>Loading....</h2>;
    }

    return (
        <div> 
            <h1> Order #{order.id}</h1>
            <p> Total : ₹{order.total_amount}</p>
            <p> Date : {order.created_at}</p>
        </div>
    );
}

export default OrderDetails;
