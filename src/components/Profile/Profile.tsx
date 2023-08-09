import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../types/types";

type PropsType = {
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<void>
    isOwner: boolean
    status: string
    profile: ProfileType | null
    updateStatus: (status: string) => void
}

const Profile = (props:PropsType): JSX.Element => {
    console.log(props)
    return (
        <div>
            <ProfileInfo saveProfile={props.saveProfile} savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;