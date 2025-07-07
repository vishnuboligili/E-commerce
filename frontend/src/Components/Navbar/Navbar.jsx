import React, { useContext, useRef, useState } from 'react'
import './Navbar.css';
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import drop_img from "../Assets/nav_dropdown.png";

export const Navbar = () => {
    const [menu,setMenu]=useState("shop");
    const{getTotalItems}=useContext(ShopContext);
    const menuRef=useRef();
    const dropdown_toggle=(e)=>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt="logo" />
            <p>SHOPPER</p>
        </div>
        <img onClick={dropdown_toggle} className='nav-dropdown' src={drop_img} alt="" />
        <ul ref={menuRef} className='nav-menu' >
            <li onClick={()=>{setMenu("shop")}}><Link to='/' style={{textDecoration:'none'}}>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("mens")}}><Link to='/mens' style={{textDecoration:'none'}}>Men</Link> {menu==="mens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("womens")}}><Link to='/womens' style={{textDecoration:'none'}}>Women</Link> {menu==="womens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link to='/kids' style={{textDecoration:'none'}}>Kids</Link> {menu==="kids"?<hr/>:<></>}</li>
        </ul>
        
        <div className="nav-login-cart">
            {localStorage.getItem('auth-toke')?
            <button onClick={()=>{localStorage.removeItem('auth-toke');window.location.replace('/')}}>Logout</button>:
            <Link to="/login"><button>Login</button></Link>}
            
            <Link to="/cart"><img src={cart_icon} alt="cart_icon" /></Link>
            
            <div className="nav-bar-count">{getTotalItems()}</div>
        </div>
    </div>
  )
}
