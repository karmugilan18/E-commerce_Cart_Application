import { useState, useEffect } from "react";
import API from "../api/axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [search , setSearch] = useState("");
  const [category , setCategory] = useState("");
  const [maxPrice , setMaxPrice] = useState("");
  


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
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === "" || product.category === category ;

    const matchesPrice = maxPrice === "" || Number(product.price) <= Number(maxPrice);

    return matchesSearch && matchesCategory && matchesPrice;
  });
  

  return (
    <div>
      <h1>Products</h1>
      <input type  = "text" placeholder="Search Products...." value = {search} onChange={(e) => setSearch(e.target.value)} />
      {filteredProducts.length === 0 && (
        <p> No Products found </p>
      )}
      <select  value = {category} onChange = {(e) => setCategory(e.target.value)} >
        <option value = "">ALL Categories</option>
        <option value = "electronics">Electronics</option>
        <option value = "accessories ">Accessories</option>
      </select>
      <input type = "number" placeholder="Maximum Price" value = {maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />

      {filteredProducts.map((product) => (
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