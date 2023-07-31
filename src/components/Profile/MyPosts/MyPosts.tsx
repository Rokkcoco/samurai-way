import React, {FC} from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {PostsDataType} from "../../../redux/store";
import {FieldValues, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";


type MyPostsType = {
    addPost: (post: string) => void
    posts: PostsDataType[]
}


const MyPosts: FC<MyPostsType> = React.memo(({addPost, posts}): JSX.Element => {

    const postsElements: JSX.Element[] = posts.map((t, index) => <Post key={index} message={t.message}
                                                                       likeCounts={t.likesCount}
                                                                       id={t.id}/>)


    return <div className={s.postsBlock}>
        <h3>My posts</h3>
        <AddNewPostForm addPost={addPost}/>
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>
})

type AddNewPostFormPropsType = {
    addPost: (post: string) => void
}

const AddNewPostForm = (props: AddNewPostFormPropsType) => {

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
    console.log(myPostsSchema)
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

export default MyPosts;