import React, {FC} from 'react';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {MessagesPageType} from "../../redux/store";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";

type DialogsContainerType = {
store: any
}

const DialogsContainer: FC<DialogsContainerType> = ({store}): JSX.Element => {

    const state = store.getState()

    const onSendMessageClick = () => {
        store.dispatch(sendMessageCreator())
    }

    const onNewMessageChange = (body: string) => {
        store.dispatch(updateNewMessageBodyCreator(body))
    }


    return <Dialogs updateNewMessageBody={onNewMessageChange} sendMessage={onSendMessageClick} dialogsPage={state}/>
}

export default DialogsContainer;
