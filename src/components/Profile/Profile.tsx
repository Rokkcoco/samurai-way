import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import s from "./Profile.module.css";

const Profile = () => {
    return <div>
        <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJeGWruYS2qKJ5aJ3pDkNw_lmcDS-Rez_BjlOgRasT&s"/>
        </div>
        <div>
            ava + description
        </div>
        <MyPosts />
    </div>
}

export default Profile;