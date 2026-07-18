import { Link , useNavigate } from "react-router-dom";

function Navbar()
{
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("logged Out ");
        window.location.href = "/login";
        

    };
    return (
        <div>
            <Link to ="/"> Products</Link>

            {" | "}

            {token ? (
                <>
                <Link to = "/cart"> Cart</Link>
                {" | "}

                <Link to = "/orders"> Orders</Link>

                {" | "}

                <button onClick = {handleLogout}>
                    Logout
                </button>
                </>
            ):(
                <>
                <Link to = "/login"> Login </Link>
                {" | "}
 
                <Link to = "/register"> Register</Link>
                </>
            )}

            <hr/>
        </div>
    )
   
}
export default Navbar;
