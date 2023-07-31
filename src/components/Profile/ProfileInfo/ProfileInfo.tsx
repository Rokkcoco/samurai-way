import React from "react";
import s from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
//если профайл нал или андефайнед
const ProfileInfo = (props:any):JSX.Element => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            {/*<div>*/}
            {/*    <img*/}
            {/*        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJeGWruYS2qKJ5aJ3pDkNw_lmcDS-Rez_BjlOgRasT&s"/>*/}
            {/*</div>*/}
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large} />
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;