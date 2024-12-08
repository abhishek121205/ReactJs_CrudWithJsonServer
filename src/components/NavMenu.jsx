import React, { useContext, useEffect, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";
import userContext from '../context/userContext';

const NavMenu = ({ count }) => {
  const [user, setUser] = useState({ role: "Admin" });
  const { setCurrentUser, currentuser } = useContext(userContext)
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    setCurrentUser(user)
  }, [user])

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark" style={{ marginBottom: 20, zIndex: 999 }} className='shadow-lg position-sticky t-0' >
      <div className='container-fluid px-3'>
        <div className='d-none d-sm-flex justify-content-between w-100 align-items-center'>
          <Navbar.Brand className='fs-3'>Amazon</Navbar.Brand>
          <Nav className="">
            <Link className='link fs-5' to={"/"} >Home</Link>
            {currentuser.role == "Admin" && (<Link className='link fs-5' to={"/addProduct"} >Add</Link>)}
            <Link className='link fs-5' to={"/viewProduct"} >View</Link>
          </Nav>
          <Nav className="">
            <select name="role" id="" className='me-2' onChange={handleChange}>
              <option value="Admin">Admin</option>
              <option value="user">User</option>
            </select>
            <Link to='/cart' className='text-dark text-decoration-none'>
              <FaCartShopping fontSize={26} color='white' />
              <sup className='text-white ms-1' >{count}</sup>
            </Link>
          </Nav>
        </div>
        <div className='d-sm-none d-flex justify-content-between w-100 align-items-center' style={{ position: "relative" }}>
          <Navbar.Brand className='fs-3'>Amazon</Navbar.Brand>
          <Nav className="">
            <FaBars color='white' className='me-2' fontSize={26} onClick={() => setShowMenu(!showMenu)} />
            <Link to='/cart' className='text-light text-decoration-none'>
              <FaCartShopping fontSize={26} color='white' onClick={() => setShowMenu(false)} />
              <sup className='text-white ms-1 fw-bold'>{count}</sup>
            </Link>
          </Nav>
          {showMenu && (<Nav className='d-flex flex-column text-center p-2 rounded' style={{ gap: "7px 0", position: "absolute", right: "73px", bottom: "-126px", backgroundColor: "rgba(0,0,0,0.9)" }}>
            <select name="role" id="" className='' onChange={handleChange}>
              <option value="Admin">Admin</option>
              <option value="user">User</option>
            </select>
            <Link className='link fs-5 text-white' to={"/"} onClick={() => setShowMenu(false)}  >Home</Link>
            {currentuser.role == "Admin" && (<Link onClick={() => setShowMenu(false)}  className='link fs-5 text-white' to={"/addProduct"} >Add</Link>)}
            <Link onClick={() => setShowMenu(false)}  className='link fs-5 text-white' to={"/viewProduct"} >View</Link>
          </Nav>)}
        </div>
      </div>
    </Navbar>
  )
}

export default NavMenu
