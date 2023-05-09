import React, {FC} from "react";
import MyPosts from "./MyPosts/MyPosts";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";

type ProfileType = {
   state: ProfilePageType
    addPost: (postMessage:string)=>void
}

const Profile:FC<ProfileType> = ({state, addPost}): JSX.Element => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts postsData={state.postsData} addPost={addPost}/>
        </div>
    )
}

export default Profile;