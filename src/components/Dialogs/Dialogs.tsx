import React from 'react';
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {InitialStateType} from "../../redux/dialogs-reducer";
import {AddMessageForm} from "./AddMessageForm/AddMessageForm";


type PropsType = {
    sendMessage: (newMessageBody: string) => void
    dialogsPage: InitialStateType
}

const Dialogs = ({sendMessage, dialogsPage}: PropsType): JSX.Element => {

    const dialogsElements: JSX.Element[] = dialogsPage.dialogs.map((t) => <DialogItem key={t.id} name={t.name}
                                                                                      id={t.id}/>)

    const messagesElements: JSX.Element[] = dialogsPage.messages.map((t) => <Message key={t.id} message={t.message}/>)


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageForm sendMessage={sendMessage}/>
            </div>
        </div>
    )
}


export default Dialogs;
