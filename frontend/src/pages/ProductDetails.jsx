import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [reviews, setReviews] = useState([]);
    const[rating , setRating] = useState(5);
    const [comment , setComment ] = useState("");


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

    const submitReview = async(e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            if(!token) {
                alert("Please Login to Write a review");
                return ;
            }

            const res = await API.post("/reviews",
                {
                    productId: id, 
                    rating: rating ,
                    comment: comment
                },
                {
                    headers:{
                        Authorization : `Bearer ${token}`
                    }
                }
            );
            alert(res.data.message);

            setRating(5);
            setCommit("");

            fetchReviews();


        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message || "Failed to submit review "
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
            <h2> write a review </h2>

            <form onSubmit = {submitReview}>
                <label>
                    Rating:
                </label>
                
                <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                >
                        <option value={5}>5 ⭐</option>
                        <option value={4}>4 ⭐</option>
                        <option value={3}>3 ⭐</option>
                        <option value={2}>2 ⭐</option>
                        <option value={1}>1 ⭐</option>
                </select>

                <br/>
                <br/>

                <label>
                    Comment:

                </label>

                <br/>

                <textarea value = {comment}
                          onChange = {(e) => setComment(e.target.value)}
                          placeholder = "Write Your Review.."
                          rows = "4"
                          cols = "40"
                />

                <br/>
                <br/>

                <button type = "submit">
                    SUBMIT REVIEW
                </button>

            </form>
            <hr/>

            <h2>Total Customer Reviews </h2>

            {reviews.length === 0 ? (

                <p>No users reviews yet .. if you have review thought give in a review</p>

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