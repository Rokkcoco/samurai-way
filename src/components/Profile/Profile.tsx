import React, {FC} from "react";
import MyPosts from "./MyPosts/MyPosts";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";

type ProfileType = {
   profilePage: ProfilePageType
    dispatch: (action:any)=>void
    newPostTextData: string
}

const Profile:FC<ProfileType> = ({profilePage, dispatch, newPostTextData}): JSX.Element => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts profilePage={profilePage}  dispatch={dispatch} newPostTextData={newPostTextData}/>
        </div>
    )
}

export default Profile;