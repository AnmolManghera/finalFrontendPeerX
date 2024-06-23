import React,{useState} from "react";
import "./navbar.css";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [open,setOpen] = useState(false);
  return (
    <nav>
      <Link to="/users" className="title">
        Alumanca
      </Link>
      <div className="menu" onClick={()=> setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={open? "open" : ""}>
        <li>
          <NavLink to="/users">Home</NavLink>
        </li>
        <li>
          <NavLink to="/chats">Chat</NavLink>
        </li>
        <li>
          <NavLink to="/myinterviews">Interviews</NavLink>
        </li>
        <li>
          <NavLink to="/notifications">Notifications</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
