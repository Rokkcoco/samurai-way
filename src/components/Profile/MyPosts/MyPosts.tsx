import React, {FC} from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

type MyPostsType = {
    id: number
    message: string
    likesCount: number

}
const MyPosts:FC<MyPostsType> = ({id, message, likesCount}): JSX.Element => {

    let posts = [
        {id: 1, message: "Hi, how are you", likesCount: 12},
        {id: 2, message: "How are you?", likesCount: 23},
        {id: 3, message: "How old are you", likesCount: 2},
        {id: 4, message: "It\`s my first post", likesCount: 25},
        {id: 5, message: "Yo", likesCount: 9}
    ]

    let postsElements: JSX.Element[] = posts.map(p => <Post message={p.message} likeCounts={p.likesCount} id={p.id}/>)

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