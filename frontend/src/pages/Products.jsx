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

  return (
    <div>
      <h1>Products</h1>

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>

          <p>{product.description}</p>

          <h4>₹ {product.price}</h4>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Products;