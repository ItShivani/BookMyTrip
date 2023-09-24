import "./navbar.css"
import {Link} from "react-router-dom";
import {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext.jsx";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit",textDecoration:"none"}}>
          <span className="logo">BookMyTrip</span>
        </Link>
        {user ? "Hello " + user+"!" : (<div className="navItems">
            <button className="navButton">Sign up</button>
            <Link to="/login"><button className="navButton">Sign in</button></Link>
        </div>)}
      </div>
    </div>
  )
}

export default Navbar
