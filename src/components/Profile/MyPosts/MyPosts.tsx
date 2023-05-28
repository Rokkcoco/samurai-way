import React, {createRef, FC} from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {PostsDataType} from "../../../redux/store";


type MyPostsType = {
    updateNewPostText: (text: string) => void
    addPost: () => void
    posts: PostsDataType[]
    newPostText: string
}


const MyPosts: FC<MyPostsType> = ({updateNewPostText, addPost, newPostText, posts}): JSX.Element => {

    const postsElements: JSX.Element[] = posts.map((t, index) => <Post key={index} message={t.message}
                                                                                   likeCounts={t.likesCount}
                                                                                   id={t.id}/>)

    const newPostElement = createRef<HTMLTextAreaElement>()

    const onAddPost = () => {
        addPost()
    }

    const onPostChange = () => {
        if (newPostElement.current) {
            const text = newPostElement.current.value
            updateNewPostText(text)
        }
    }

    return <div className={s.postsBlock}>
        <h3>My posts</h3>
        <div>
            <textarea ref={newPostElement} value={newPostText} onChange={onPostChange}/>
        </div>
        <div>
            <button onClick={onAddPost}>Add post</button>
        </div>
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>
}

export default MyPosts;