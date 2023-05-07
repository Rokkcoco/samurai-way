import React, {FC} from 'react';
import s from "./../Dialogs.module.css";


type MessageType = {
    message: string
    id: number
}
const Message: FC<MessageType> = ({message}): JSX.Element => {
    return (
        <div className={s.dialog}>{message}</div>
    )
}


export default Message;
