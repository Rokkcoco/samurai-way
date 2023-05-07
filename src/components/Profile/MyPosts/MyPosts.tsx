import React, {FC} from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {PostsType} from "../../../index";


type MyPostsTypeLocal = {
    posts: PostsType[]
}

const MyPosts = (props:MyPostsTypeLocal): JSX.Element => {



    let postsElements: JSX.Element[] = props.posts.map((p, index) => <Post key={index} message={p.message} likeCounts={p.likesCount} id={p.id}/>)

    return <div className={s.postsBlock}>
        <h3>My posts</h3>
        <div>
            <textarea></textarea>
        </div>
        <div>
            <button>Add post</button>
        </div>
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>
}

export default MyPosts;