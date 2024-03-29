import React from 'react';
import s from "./../Dialogs.module.css";


type PropsType = {
    message: string

}
const Message = ({message}:PropsType): JSX.Element => {
    return (
        <div className={s.dialog}>{message}</div>
    )
}


export default Message;
