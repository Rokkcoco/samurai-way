import React, {createRef, FC} from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {PostsDataType} from "../../../redux/store";
import {FieldValues, useForm} from "react-hook-form";


type MyPostsType = {
    updateNewPostText: (text: string) => void
    addPost: (post:string) => void
    posts: PostsDataType[]
    newPostText: string
}


const MyPosts: FC<MyPostsType> = ({updateNewPostText, addPost, newPostText, posts}): JSX.Element => {

    const postsElements: JSX.Element[] = posts.map((t, index) => <Post key={index} message={t.message}
                                                                                   likeCounts={t.likesCount}
                                                                                   id={t.id}/>)

    const newPostElement = createRef<HTMLTextAreaElement>()

    return <div className={s.postsBlock}>
        <h3>My posts</h3>
        <AddNewPostForm addPost={addPost}/>
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>
}

type AddNewPostFormPropsType = {
    addPost: (post:string) => void
}

const AddNewPostForm = (props:AddNewPostFormPropsType) => {
    const {register, handleSubmit} = useForm()
    const onSubmit = (data: FieldValues) => {
        props.addPost(data.newPostText)
    }
    return <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <textarea {...register("newPostText")} />
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
}

export default MyPosts;