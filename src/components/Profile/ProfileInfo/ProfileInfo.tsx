import React from "react";
import s from "./ProfileInfo.module.css";

const ProfileInfo = ():JSX.Element => {
    return (
        <div>
            <div>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJeGWruYS2qKJ5aJ3pDkNw_lmcDS-Rez_BjlOgRasT&s"/>
            </div>
            <div className={s.descriptionBlock}>
                ava + description
            </div>
        </div>
    )
}

export default ProfileInfo;