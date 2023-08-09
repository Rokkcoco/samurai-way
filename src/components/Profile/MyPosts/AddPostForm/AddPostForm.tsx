import * as yup from "yup";
import {FieldValues, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import React from "react";

export type PropsType = {
    addPost: (post: string) => void
}
const AddPostForm = (props: PropsType) => {

    const myPostsSchema = yup
        .object({
            newPostText: yup.string().required("This Field cant be empty").max(30, 'Maximum 30 symbols')
        })
        .required()

    const {
        register,
        handleSubmit,
        formState: {errors, isDirty},
        reset
    }
        = useForm({resolver: yupResolver(myPostsSchema)})

    const onSubmit = (data: FieldValues) => {
        props.addPost(data.newPostText)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <textarea {...register("newPostText")}/>
                <p>{errors.newPostText?.message}</p>
            </div>
            <div>
                <button disabled={!isDirty}>Add post</button>
            </div>
        </form>
    )
}
export default AddPostForm