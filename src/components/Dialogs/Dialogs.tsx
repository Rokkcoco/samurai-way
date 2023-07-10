import React,  {FC} from 'react';
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {MessagesPageType} from "../../redux/store";
import {FieldValues, useForm} from "react-hook-form";


type DialogsType = {
    sendMessage: (newMessageBody:string)=>void
    dialogsPage: MessagesPageType
    isAuth: boolean
}

const Dialogs: FC<DialogsType> = ({sendMessage, dialogsPage, isAuth}): JSX.Element => {

    const dialogsElements: JSX.Element[] = dialogsPage.dialogs.map((t) => <DialogItem key={t.id} name={t.name} id={t.id}/>)

    const messagesElements: JSX.Element[] = dialogsPage.messages.map((t) => <Message key={t.id} message={t.message} id={t.id}/>)





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
type AddMessageFormPropsType = {
    sendMessage: (newMessageBody:string)=>void
}
const AddMessageForm = (props:AddMessageFormPropsType) => {
    const {register, handleSubmit} = useForm()
    const onSubmit = (data: FieldValues) => props.sendMessage(data.newMessageBody)
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
