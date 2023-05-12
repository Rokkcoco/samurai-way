import React, {createRef, FC} from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {PostsDataType} from "../../../redux/state";



type MyPostsType = {
    postsData: PostsDataType[]
    addPost: ()=>void
    newPostTextData: string
    updateNewPostText: (newText:string)=>void
}

const MyPosts: FC<MyPostsType> = ({postsData,addPost, newPostTextData, updateNewPostText}): JSX.Element => {

    const postsElements: JSX.Element[] = postsData.map((t, index) => <Post key={index} message={t.message} likeCounts={t.likesCount} id={t.id}/>)

    const newPostElement = createRef<HTMLTextAreaElement>()

    const onClickNewPostHandler = () => {
            addPost()
    }

    const onChangePostHandler = () => {
        if (newPostElement.current) {
            updateNewPostText(newPostElement.current.value)
        }
    }

    return <div className={s.postsBlock}>
        <h3>My posts</h3>
        <div>
            <textarea ref={newPostElement} value={newPostTextData} onChange={onChangePostHandler}/>
        </div>
        <div>
            <button onClick={onClickNewPostHandler}>Add post</button>
        </div>
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>
}

export default MyPosts;