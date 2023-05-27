import React, {FC} from "react";
import MyPosts from "./MyPosts/MyPosts";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/store";

type ProfileType = {
   profilePage: ProfilePageType
    dispatch: (action:any)=>void
    newPostText: string
}

const Profile:FC<ProfileType> = ({profilePage, dispatch, newPostText}): JSX.Element => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts profilePage={profilePage}  dispatch={dispatch} newPostText={newPostText}/>
        </div>
    )
}

export default Profile;