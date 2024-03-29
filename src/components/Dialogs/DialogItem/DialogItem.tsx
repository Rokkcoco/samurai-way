import React from 'react';
import s from "./../Dialogs.module.css";
import {NavLink} from "react-router-dom";

type PropsType = {
    name: string
    id: number
}

const DialogItem = ({name, id}:PropsType): JSX.Element => {
    return (
        <div className={s.dialog + " " + s.active}>
            <NavLink to={`/dialogs/${id}`}>{name}</NavLink>
        </div>
    )
}

export default DialogItem;
