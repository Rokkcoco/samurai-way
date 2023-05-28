import React, {FC} from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

import MyPostsContainer from "./MyPosts/MyPostsContainer";


type ProfileType = {
    store: any
}

const Profile:FC<ProfileType> = ({store}): JSX.Element => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer store={store} />
        </div>
    )
}

export default Profile;