import React, {FC} from "react";
import MyPosts from "./MyPosts/MyPosts";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";

type ProfileType = {
   profilePage: ProfilePageType
    addPost: ()=>void
    newPostTextData: string
    updateNewPostText: (newText:string)=>void
}

const Profile:FC<ProfileType> = ({profilePage, addPost, newPostTextData, updateNewPostText}): JSX.Element => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts postsData={profilePage.postsData} addPost={addPost} newPostTextData={newPostTextData} updateNewPostText={updateNewPostText}/>
        </div>
    )
}

export default Profile;