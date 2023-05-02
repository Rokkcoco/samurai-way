import React from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = ():JSX.Element => {
    return <div className={s.postsBlock}>
        <h3>My posts</h3>
        <div>
        <textarea></textarea>
        </div>
        <div>
        <button>Add post</button>
        </div>
            <div className={s.posts}>
               <Post message="Hi, how are you?" likeCounts={6}/>
                <Post message="How old are you?" likeCounts={7}/>
            </div>
        </div>
}

export default MyPosts;