import React, {ChangeEvent, FC} from 'react';
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {MessagesPageType, sendMessageCreator, updateNewMessageBody} from "../../redux/state";

type DialogsType = {
dialogsPage: MessagesPageType
    dispatch: (action:any)=>void
}

const Dialogs: FC<DialogsType> = ({dialogsPage, dispatch}): JSX.Element => {

    const dialogsElements: JSX.Element[] = dialogsPage.dialogs.map((t, index) => <DialogItem key={index} name={t.name} id={t.id}/>)

    const messagesElements: JSX.Element[] = dialogsPage.messages.map((t, index) => <Message key={index} message={t.message} id={t.id}/>)

    const onSendMessageClick = () => {
        dispatch(sendMessageCreator())
    }

    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
       let body =  e.target.value
        dispatch(updateNewMessageBody(body))
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
