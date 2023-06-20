import React, {FC} from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

import MyPostsContainer from "./MyPosts/MyPostsContainer";



const Profile = (props): JSX.Element => {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;