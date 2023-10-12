import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./styles.css";
import { Divide as Hamburger } from 'hamburger-react'

function Navbar() {
    const [isOpen, setOpen] = useState(false);
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => {
        setClick(false);
        setOpen(false);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-receipt-tax" width="50" height="50" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M9 14l6 -6"></path>
                            <circle cx="9.5" cy="8.5" r=".5" fill="currentColor"></circle>
                            <circle cx="14.5" cy="13.5" r=".5" fill="currentColor"></circle>
                            <path fill="none" d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2"></path>
                        </svg>
                        TaxNet
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <Hamburger color="white" toggled={isOpen} toggle={setOpen} />
                    </div>
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    "nav-links" + (isActive ? " activated" : "")
                                }
                                onClick={closeMobileMenu}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/sales"
                                className={({ isActive }) =>
                                    "nav-links" + (isActive ? " activated" : "")
                                }
                                onClick={closeMobileMenu}
                            >
                                Sales
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/purchase"
                                className={({ isActive }) =>
                                    "nav-links" + (isActive ? " activated" : "")
                                }
                                onClick={closeMobileMenu}
                            >
                                Purchase
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
    );
}

export default Navbar;