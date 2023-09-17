import "./navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">BookMyTrip</span>
        <div className="navItems">
            <button className="navButton">Sign up</button>
            <button className="navButton">Sign in</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
