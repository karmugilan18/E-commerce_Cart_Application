import { useState}  from "react";
import API from "../api/axios";

function  Register() {
  const [name , setName] = useState("");
  const [email , setEmail]  = useState("");
  const[password , setPassword] = useState("");

  const handleRegister = async(e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register" , {
        name, 
        email , 
        password
      });
      alert(res.data.message);

    } catch (error) {
      console.log("error" , error);
      console.log("response" , error.response?.data);

      alert(
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div>
      <h1> Register </h1>

      <form onSubmit  = { handleRegister }>
        <input 
          type="text"
          placeholder="Name"
          onChange={ (e) => setName(e.target.value)}
        />

        <br/>

        <input
          type = "email"
          placeholder="Email"
          onChange = {(e) => setEmail(e.target.value)}
        />

        <br />

        <input
          type= "password"
          placeholder="password"
          onChange = {(e)=> setPassword(e.target.value)}

        />

        <br />

        <button type = "submit" > Register </button>
        
      </form>

    </div>
  );
}

export default Register;

