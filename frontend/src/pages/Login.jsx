import { useState } from "react";
import API from "../api/axios";

import "../styles/Login.css";

function Login() {
    const [email , setEmail ] = useState("");
    const [password , setPassword]  = useState("");
    const handleLogin  = async (e) =>
    {
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", {
                email , password
            });

            localStorage.setItem("token" , res.data.token);
            alert("Login Successfull");

        } catch (error) {
           console.log("error" , error);
           console.log("response" , error.response?.data);

           alert(
                error.response?.data?.message || error.message
            );

        }
    };
    return (
        <div className = "login-container ">
            <h1> Login </h1>

            <form onSubmit={handleLogin}>
                <input 
                    type = "email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br/>

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br/>

                <button type ="submit"> Login</button>
            </form>
        </div>
    );

}

export default Login;