import { useState, useEffect } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [search , setSearch] = useState("");
  const [page , setPage] = useState(1);
  const [sort , setSort] = useState();

  const [maxPrice , setMaxPrice] = useState("");
  


  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    try {
      const res = await API.get(`/products?page=${page}&limit=6`);
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



    const matchesPrice = maxPrice === "" || Number(product.price) <= Number(maxPrice);

    return matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts];
  switch (sort)
  {
    case "priceLow":
      sortedProducts.sort((a,b) => Number(a.price)-Number(b.price));
      break;
    
    case "priceHigh":
      sortedProducts.sort((a,b) => Number(b.price)-Number(a.price));
      break;
    
    case "nameAsc":
      sortedProducts.sort((a,b) => a.name.localeComparr(b.name));
      break;

    case "nameDesc":
      sortedProducts.sort((a,b) => b.name.localeCompare(a.name));
      break;

    default:
      break;
  }
  

  return (
    <div>
      <h1>Products</h1>
      <input type  = "text" placeholder="Search Products...." value = {search} onChange={(e) => setSearch(e.target.value)} />
      {filteredProducts.length === 0 && (
        <p> No Products found </p>
      )}
      <input type = "number" placeholder="Maximum Price" value = {maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      <select value={sort} onChange = {(e) => setSort(e.target.value)}>
        <option value = ""> Default</option>
        <option value = "priceLow"> Price : Low to High</option>
        <option value = "priceHigh"> price: High to Low</option>
        <option value = "nameAsc"> Name : A-Z</option>
        <option value ="nameDesc"> Name :Z-A</option>
      </select>
      {sortedProducts.map((product) => (
        <div key={product.id}>
          <h3>Showing {sortedProducts.length} Products</h3>
          <img src = {`/images/${product.image_url}`}
               alt = {product.name}
               width = "200"
               heigth = "200"
          />
          <Link to={`/products/${product.id}`}>
          <h3>{product.name}</h3>
          </Link>

          <p>{product.description}</p>

          <h4>₹ {product.price}</h4>

          <button onClick={() => addToCart(product.id)}>

            Add To Cart
          </button>
          

          <hr />


        </div>
      ))}
      <button
        disabled = {page === 1}
        onClick = {() => setPage(page -1)}
      >
        Previous
      </button>

      <span> Page {page}</span>
      <button
        
        onClick = {() => setPage(page -1)}
      >
        Next
      </button>

    </div>
  );
}

export default Products;