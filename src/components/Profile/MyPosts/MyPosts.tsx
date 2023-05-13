import React, {createRef, FC} from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {addPostActionCreator, ProfilePageType, updateNewPostTextActionCreator} from "../../../redux/state";

type MyPostsType = {
    dispatch:(action:any)=>void
    profilePage: ProfilePageType
    newPostTextData:string
}


const MyPosts: FC<MyPostsType> = ({profilePage, dispatch, newPostTextData}): JSX.Element => {

    const postsElements: JSX.Element[] = profilePage.postsData.map((t, index) => <Post key={index} message={t.message} likeCounts={t.likesCount} id={t.id}/>)

    const newPostElement = createRef<HTMLTextAreaElement>()

    const onClickNewPostHandler = () => {
            dispatch(addPostActionCreator())
    }

    const onChangePostHandler = () => {
        if (newPostElement.current) {
            const text = newPostElement.current.value
            dispatch(updateNewPostTextActionCreator(text))
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