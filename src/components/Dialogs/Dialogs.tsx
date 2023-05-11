import React, {FC} from 'react';
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {MessagesPageType} from "../../redux/state";

type DialogsType = {
messagesPage: MessagesPageType
}

const Dialogs: FC<DialogsType> = ({messagesPage}): JSX.Element => {

    const dialogsElements: JSX.Element[] = messagesPage.dialogsData.map((t, index) => <DialogItem key={index} name={t.name} id={t.id}/>)

    const messagesElements: JSX.Element[] = messagesPage.messagesData.map((t, index) => <Message key={index} message={t.message} id={t.id}/>)

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
