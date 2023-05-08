import React, {createRef, FC} from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {PostsDataType} from "../../../redux/state";



type MyPostsType = {
    postsData: PostsDataType[]
}

const MyPosts: FC<MyPostsType> = ({postsData}): JSX.Element => {


    let postsElements: JSX.Element[] = postsData.map((t, index) => <Post key={index} message={t.message} likeCounts={t.likesCount} id={t.id}/>)

    let newPostElement = createRef<HTMLTextAreaElement>()

    let addPost = () => {
        let text = newPostElement.current?.value;
        alert(text)
    }

    return <div className={s.postsBlock}>
        <h3>My posts</h3>
        <div>
            <textarea ref={newPostElement}></textarea>
        </div>
        <div>
            <button onClick={addPost}>Add post</button>
        </div>
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>
}

export default MyPosts;