import React, {createRef, FC} from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {PostsDataType} from "../../../redux/state";



type MyPostsType = {
    postsData: PostsDataType[]
    addPost: (postMessage:string)=>void
}

const MyPosts: FC<MyPostsType> = ({postsData,addPost}): JSX.Element => {

    const postsElements: JSX.Element[] = postsData.map((t, index) => <Post key={index} message={t.message} likeCounts={t.likesCount} id={t.id}/>)

    const newPostElement = createRef<HTMLTextAreaElement>()

    const newPostHandler = () => {
        if (newPostElement.current) {
            addPost(newPostElement.current.value)
            console.log(postsData)
            newPostElement.current.value = ''
        }
    }

    return <div className={s.postsBlock}>
        <h3>My posts</h3>
        <div>
            <textarea ref={newPostElement}></textarea>
        </div>
        <div>
            <button onClick={newPostHandler}>Add post</button>
        </div>
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>
}

export default MyPosts;