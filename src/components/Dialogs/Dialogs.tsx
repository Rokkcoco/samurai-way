import React, {FC} from 'react';
import s from "./Dialogs.module.css";
import {NavLink} from "react-router-dom";

type DialogItemType = {
    name: string
    id: string
}

type MessageType = {
    message:string
}
const Message:FC<MessageType> = ({message}):JSX.Element => {
    return (
        <div className={s.dialog}>{message}</div>
    )
}

const DialogItem: FC<DialogItemType> = ({name, id}): JSX.Element => {
    return (
        <div className={s.dialog + " " + s.active}>
            <NavLink to={`/dialogs/${id}`}>{name}</NavLink>
        </div>
    )
}

const Dialogs = (): JSX.Element => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem name="Dimych" id="1"/>
                <DialogItem name="Andrey" id="2"/>
                <DialogItem name="Sveta" id="3"/>
                <DialogItem name="Sasha" id="4"/>
                <DialogItem name="Viktor" id="5"/>
                <DialogItem name="Valera" id="6"/>
            </div>
            <div className={s.messages}>
                <Message message="Hi" />
                <Message message="How are you?" />
                <Message message="Yo" />
            </div>
        </div>
    )
}

export default Dialogs;
