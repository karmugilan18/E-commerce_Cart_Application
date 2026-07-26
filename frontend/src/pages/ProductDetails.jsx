import { useEffect , useState  } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function  ProductDetails() {
    const {id} = useParams();
    const [product , setProduct] = useState(null);
    const [quantity ,setQuantity] = useState(1);


    useEffect(()=> {
        fetchProduct();

    },[id]);

    const fetchProduct = async () => {
        try {
            const res = await API.get(`/products/${id}`);

            setProduct(res.data.product);

        } catch (error) {
            console.log(error);

        }
    };
    if(!product) {
        return <h2>Loading....</h2>;

    }

    const addToCart = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await API.post("/cart/add", {
                productId : product.id,
                quantity : quantity
            },
            {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }
        );
        alert(res.data.message);
        setQuantity(1);


        } catch (error) {
            alert(error.response?.data?.message || "Failed to add product to cart ");

        }
    };

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <h2>₹ {product.price}</h2>
            <div>
                <button onClick={() => setQuantity((previousQuantity) => Math.max(1, previousQuantity-1))}>-</button>
                <span>{Math.max(1, quantity-1)}</span>
                <button onClick={() => setQuantity((previousQuantity) => previousQuantity+1)}>+</button>

            </div>
            <button onClick = {addToCart}>
                Add To Cart
            </button>
        </div>
    )
}

export default ProductDetails;