import React from 'react';
import s from "./Navbar.module.css"
import {NavLink} from "react-router-dom";



const Navbar = ():JSX.Element => {
    return (

        <nav className={s.nav}>
            <div>
                <NavLink to="/profile" className={t => t.isActive ? s.active : s.item}>Profile</NavLink>
            </div>
            <div>
                <NavLink to="/dialogs" className={t => t.isActive ? s.active : s.item}>Messages</NavLink>
            </div>
            <div>
                <NavLink to="/users" className={t => t.isActive ? s.active : s.item}>Users</NavLink>
            </div>
            <div >
                <NavLink to="/news" className={t => t.isActive ? s.active : s.item}>News</NavLink>
            </div>
            <div>
                <NavLink to="/music" className={t => t.isActive ? s.active : s.item}>Music</NavLink>
            </div>
            <div>
                <NavLink to="/settings" className={t => t.isActive ? s.active : s.item}>Settings</NavLink>
            </div>
        </nav>
    )
}

export default Navbar;


