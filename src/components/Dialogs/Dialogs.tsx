import React, {FC} from 'react';
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {MessagesPageType} from "../../redux/store";
import {FieldValues, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";


type DialogsType = {
    sendMessage: (newMessageBody: string) => void
    dialogsPage: MessagesPageType
    isAuth: boolean
}

const Dialogs: FC<DialogsType> = ({sendMessage, dialogsPage, isAuth}): JSX.Element => {

    const dialogsElements: JSX.Element[] = dialogsPage.dialogs.map((t) => <DialogItem key={t.id} name={t.name}
                                                                                      id={t.id}/>)

    const messagesElements: JSX.Element[] = dialogsPage.messages.map((t) => <Message key={t.id} message={t.message}
                                                                                     id={t.id}/>)


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
    sendMessage: (newMessageBody: string) => void
}
const AddMessageForm = (props: AddMessageFormPropsType) => {

    const DialogsSchema = yup
        .object({
            newMessageBody: yup.string().required("This Field cant be empty").max(30, 'Maximum 30 symbols')
        })
        .required()

    const {
        register,
        handleSubmit,
        formState: {errors, isDirty},
        reset
    }
        = useForm({resolver: yupResolver(DialogsSchema)})

    const onSubmit = (data: FieldValues) => {
        props.sendMessage(data.newMessageBody)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div><textarea
                {...register("newMessageBody")}
                placeholder="Enter your message"></textarea>
                <p>{errors.newMessageBody?.message}</p>
            </div>
            <div>
                <button disabled={!isDirty}>Send</button>
            </div>
        </form>
    )
}

export default Dialogs;
