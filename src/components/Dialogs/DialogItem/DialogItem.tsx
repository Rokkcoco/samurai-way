import React from 'react';
import s from "./../Dialogs.module.css";
import {NavLink} from "react-router-dom";

type DialogItemType = {
    name: string
    id: number
}

const DialogItem = ({name, id}:DialogItemType): JSX.Element => {
    return (
        <div className={s.dialog + " " + s.active}>
            <NavLink to={`/dialogs/${id}`}>{name}</NavLink>
        </div>
    )
}

export default DialogItem;
