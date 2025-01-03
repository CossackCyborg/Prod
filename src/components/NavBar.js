import { Link } from "react-router-dom"
import * as userService from '../utilities/users-service'

export default function NavBar ({ name, setUser }) {
  function handleLogout () {
    // Delegate to the users-service
    userService.logOut()
    setUser(null)
  }

  return (
    name?
    <>
    <nav className = "navBar navbar fixed-top admin-navbar">
        <div className="navbar-logo">
          <Link to="/" className = "d-inline-block align-text-top">
          <img src ="https://i.imgur.com/3WSXIEd.png" height = "30px" className = "brand-img" alt="Salem Crown Apartments Logo"></img> 
          <span className="navbar-brand">Salem Crown Apartments</span> 
          </Link>
        </div>
        

        <ul className="nav-links"> 
          <li>

            <Link to="/irunthis"> <span className="navbar-text">Manage</span> </Link>
          </li>
          <li>
            <Link to="/available"> <span className="navbar-text">Availability</span> </Link>
          </li>
          <li>
            <Link to="/about"> <span className="navbar-text">About Us</span> </Link>
          </li>
          <li>
            <Link to="/contact"> <span className="navbar-text">Contact Us</span> </Link>
          </li>
         
          <li>
            <Link to="" onClick={handleLogout}> <span className="navbar-text"> Log Out</span> </Link>
          </li>
        </ul>
    </nav>
    <p id="admin-welcome-msg">Welcome, {name}</p>
    </>
  
    :
    <>
      <nav className = "navBar navbar fixed-top ">
        <div>
          <Link to="/" className = "d-inline-block align-text-top">
          <img src ="https://i.imgur.com/3WSXIEd.png" height = "30px" className = "brand-img" alt="Salem Crown Apartments Logo"></img> 
          <span className="navbar-brand">Salem Crown Apartments</span> 
          </Link>
        </div>
    

        <ul className="nav-links"> 
          <li>
            <Link to="/available"> <span className="navbar-text">Availability</span> </Link>
          </li>
          <li>
            <Link to="/about"> <span className="navbar-text">About Us</span> </Link>
          </li>
          <li>
            <Link to="/contact"> <span className="navbar-text">Contact Us</span> </Link>
          </li>
  
        </ul>
      </nav>
      
    </>

  )
}