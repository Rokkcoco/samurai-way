import * as yup from "yup";
import {FieldValues, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import React from "react";

type AddMessageFormPropsType = {
    sendMessage: (newMessageBody: string) => void
}
export const AddMessageForm = (props: AddMessageFormPropsType) => {
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