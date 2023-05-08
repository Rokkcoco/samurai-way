import React, {FC} from 'react';
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {MessagesPageType} from "../../redux/state";

type DialogsType = {
state: MessagesPageType
}

const Dialogs: FC<DialogsType> = ({state}): JSX.Element => {

    let dialogsElements: JSX.Element[] = state.dialogsData.map((t, index) => <DialogItem key={index} name={t.name} id={t.id}/>)

    let messagesElements: JSX.Element[] = state.messagesData.map((t, index) => <Message key={index} message={t.message} id={t.id}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    )
}

export default Dialogs;
