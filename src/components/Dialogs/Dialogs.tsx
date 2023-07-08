import React, {ChangeEvent, FC} from 'react';
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {MessagesPageType} from "../../redux/store";
import {useForm} from "react-hook-form";
import {log} from "util";


type DialogsType = {
    updateNewMessageBody: (body:string)=>void
    sendMessage: ()=>void
    dialogsPage: MessagesPageType
    isAuth: boolean
}

const Dialogs: FC<DialogsType> = ({updateNewMessageBody, sendMessage, dialogsPage, isAuth}): JSX.Element => {

    const dialogsElements: JSX.Element[] = dialogsPage.dialogs.map((t) => <DialogItem key={t.id} name={t.name} id={t.id}/>)

    const messagesElements: JSX.Element[] = dialogsPage.messages.map((t) => <Message key={t.id} message={t.message} id={t.id}/>)

    const onSendMessageClick = () => {
        sendMessage()
    }

    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        updateNewMessageBody(e.target.value)
    }

    const addMessage = (e:any) => {
        alert(e)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
        <AddMessageForm/>
            </div>
        </div>
    )
}

const AddMessageForm = () => {
    const {register, handleSubmit} = useForm()
    const onSubmit = (d: any) => console.log(d)
   return <form onSubmit={handleSubmit(onSubmit)}>
       {/*value={dialogsPage.newMessageBody}*/}
      {/* onChange={onNewMessageChange}*/}
        <div><textarea
                       {...register("newMessageBody")}

                       placeholder="Enter your message"></textarea></div>
        <div><button>Send</button></div>
    </form>
}

export default Dialogs;
