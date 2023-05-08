import React, {FC} from "react";
import MyPosts from "./MyPosts/MyPosts";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";

type ProfileType = {
   state: ProfilePageType
}

const Profile:FC<ProfileType> = ({state}): JSX.Element => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts postsData={state.postsData}/>
        </div>
    )
}

export default Profile;