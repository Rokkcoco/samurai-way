import React, {FC} from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";

type MyPostsType = {
    store: any
}


const MyPostsContainer: FC<MyPostsType> = ({store}): JSX.Element => {
    const state = store.getState()
    const addPost = () => {
            store.dispatch(addPostActionCreator())
    }

    const onChangePost = (text:string) => {
        const action = updateNewPostTextActionCreator(text)
            store.dispatch(action)

    }

    return <MyPosts updateNewPostText={onChangePost} addPost={addPost} posts={state.profilePage.posts} newPostText={state.profilePage.newPostText}/>
}

export default MyPostsContainer;