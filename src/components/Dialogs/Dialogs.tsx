import React, {ChangeEvent, FC} from 'react';
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {MessagesPageType} from "../../redux/store";

type DialogsType = {
    updateNewMessageBody: (body:string)=>void
    sendMessage: ()=>void
    dialogsPage: MessagesPageType
}

const Dialogs: FC<DialogsType> = ({updateNewMessageBody, sendMessage, dialogsPage}): JSX.Element => {

    const dialogsElements: JSX.Element[] = dialogsPage.dialogs.map((t, index) => <DialogItem key={index} name={t.name} id={t.id}/>)

    const messagesElements: JSX.Element[] = dialogsPage.messages.map((t, index) => <Message key={index} message={t.message} id={t.id}/>)

    const onSendMessageClick = () => {
        sendMessage()
    }

    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
       let body =  e.target.value
        updateNewMessageBody(body)
    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea value={dialogsPage.newMessageBody}
                                   onChange={onNewMessageChange}
                                   placeholder="Enter your message"></textarea></div>
                    <div><button onClick={onSendMessageClick}>Send</button></div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;
