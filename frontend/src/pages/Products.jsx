import { useState, useEffect } from "react";
import API from "../api/axios";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      console.log(res.data.products);
      

      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.post("cart/add" , { productId , quantity :1},{headers : {Authorization : `Bearer ${token}`}});
      console.log("Added product :", productId);

    } catch (error) {
      alert(error.response?.data?.message || "Failed to add product ");

    }
  };
  return (
    <div>
      <h1>Products</h1>

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>

          <p>{product.description}</p>

          <h4>₹ {product.price}</h4>

          <button onClick={() => addToCart(product.id)}>

            Add To Cart
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Products;