import React from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = () => {
    return <div>
            My posts
            <div>
                New post
            </div>
        <textarea></textarea>
        <button>Add post</button>
        <button>Remove post</button>
            <div className={s.posts}>
               <Post message="Hi, how are you?" likeCounts={6}/>
                <Post message="How old are you?" likeCounts={7}/>
            </div>
        </div>
}

export default MyPosts;