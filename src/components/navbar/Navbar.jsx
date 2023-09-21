import "./navbar.css"
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit",textDecoration:"none"}}>
          <span className="logo">BookMyTrip</span>
        </Link>
        <div className="navItems">
            <button className="navButton">Sign up</button>
            <button className="navButton">Sign in</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
