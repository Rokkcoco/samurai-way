import React, {FC} from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import AddPostForm from "./AddPostForm/AddPostForm";
import {PostType} from "../../../types/types";


type PropsType = {
    addPost: (newPostText: string) => void
    posts: PostType[]
}

const MyPosts = React.memo(({addPost, posts}: PropsType): JSX.Element => {

    const postsElements: JSX.Element[] = posts.map((t, index) => <Post key={index} message={t.message}
                                                                       likeCounts={t.likesCount}
                                                                       id={t.id}/>)

    return <div className={s.postsBlock}>
        <h3>My posts</h3>
        <AddPostForm addPost={addPost}/>
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>
})



export default MyPosts;