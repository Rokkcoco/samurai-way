import React from 'react';
import s from "./Header.module.css"
import {NavLink} from "react-router-dom";


const  Header = () => {
    return <header className={s.header}>
        <div className={s.loginBlock}>
            <NavLink to={"/login"}>Login</NavLink>
        </div>
       <img src="https://sun9-77.userapi.com/impg/YOFdnL9of9TPSLhBuzCmz_cKQftUkMxr1Umm9Q/POeffpDY-Jg.jpg?size=930x1162&quality=95&sign=af8b6c9c5196d5f537c66a39f72298e7&type=album" />
    </header>
}

export default Header;