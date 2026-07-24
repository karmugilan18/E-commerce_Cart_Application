import { useEffect , useState  } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function  ProductDetails() {
    const {id} = useParams();
    const [product , setProduct] = useState(null);

    useEffect(()=> {
        fetchProduct();

    },[id]);

    const fetchProduct = async () => {
        try {
            const res = await API.get(`/products/${id}`);

            setProducts(res.data.product);

        } catch (error) {
            console.log(error);

        }
    };
    if(!product) {
        return <h2>Loading....</h2>;

    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <h2>₹ {product.price}</h2>
            <button>
                Add To <Cart></Cart>
            </button>
        </div>
    )
}

export default ProductDetails;