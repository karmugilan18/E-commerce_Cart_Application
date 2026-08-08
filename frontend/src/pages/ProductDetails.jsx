import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [reviews, setReviews] = useState([]);

    const fetchProduct = async () => {
        try {

            const res = await API.get(`/products/${id}`);

            setProduct(res.data.product);

        } catch (error) {

            console.log(error);

        }
    };

    const fetchReviews = async () => {
        try {

            const res = await API.get(`/reviews/${id}`);

            setReviews(res.data.reviews);

        } catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {

        fetchProduct();
        fetchReviews();

    }, [id]);

    if (!product) {
        return <h2>Loading....</h2>;
    }

    const addToCart = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await API.post(
                "/cart/add",
                {
                    productId: product.id,
                    quantity: quantity
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(res.data.message);

            setQuantity(1);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to add product to cart"
            );

        }
    };

    return (
        <div>

            <img
                src={`/images/${product.image_url}`}
                alt={product.name}
                width="300"
                onError={(e) => {
                    e.target.src = "/images/no-image.png";
                }}
            />

            <h1>{product.name}</h1>

            <p>{product.description}</p>

            <h2>₹ {product.price}</h2>

            <div>

                <button
                    onClick={() =>
                        setQuantity((previousQuantity) =>
                            Math.max(1, previousQuantity - 1)
                        )
                    }
                >
                    -
                </button>

                <span> {quantity} </span>

                <button
                    onClick={() =>
                        setQuantity(
                            (previousQuantity) =>
                                previousQuantity + 1
                        )
                    }
                >
                    +
                </button>

            </div>

            <br />

            <button onClick={addToCart}>
                Add To Cart
            </button>

            <hr />

            <h2>Customer Reviews</h2>

            {reviews.length === 0 ? (

                <p>No Reviews yet.</p>

            ) : (

                reviews.map((review) => (

                    <div key={review.id}>

                        <h3>{review.name}</h3>

                        <p>
                            {"⭐".repeat(review.rating)}
                        </p>

                        <p>{review.comment}</p>

                        <small>
                            {new Date(
                                review.created_at
                            ).toLocaleString()}
                        </small>

                        <hr />

                    </div>

                ))

            )}

        </div>
    );
}

export default ProductDetails;