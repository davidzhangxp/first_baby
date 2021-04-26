import React from 'react'
import {Link} from 'react-router-dom'
import '../css/Navbar.css'
import { Icon } from 'react-icons-kit'
import { home } from 'react-icons-kit/icomoon/home'
import {FaShoppingCart,FaPenSquare} from 'react-icons/fa'

export const Navbar = ({user}) => {
const isAdim = user ? user.admin : false
    return (
        <div className="navbar">

            <div className="brand">
                <Link to="/" className="brandlink"><Icon size={32} icon={home}/></Link>
            </div>

            <div className="navbar-items">
                {user ? <Link to="/profile" className="profile">{user.userName}</Link> :<Link to="/login" className="signin">Login</Link> }
                <Link to="/signup" className="signup">Signup</Link>
                <Link to="/cart"><FaShoppingCart style={{color:'red',cursor:'pointer'}} size="3rem"/></Link>
                {isAdim && <Link to="/addproducts" className="cart"><FaPenSquare style={{color:'purple',cursor:'pointer'}} size="3rem"/></Link>}
            </div>
        </div>
    )
}
