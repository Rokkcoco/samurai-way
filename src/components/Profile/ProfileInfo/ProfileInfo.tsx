import React, {ChangeEvent, useState} from "react";
import s from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/userPhoto.png"
import ProfileDataForm from "./ProfileDataForm";
import {ProfileData} from "./ProfileData";
import {ProfileType} from "../../../types/types";


//если профайл нал или андефайнед

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<void>
}
const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}: PropsType): JSX.Element => {

    const [editMode, setEditMode] = useState(false)

    const activateEditMode = () => setEditMode(true)


    if (!profile) return <Preloader/>


    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    const disableEditMode = () => setEditMode(false)

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img alt="avatar" src={profile.photos.large || userPhoto} className={s.mainPhoto}/>
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                {editMode ? <ProfileDataForm  disableEditMode={disableEditMode}
                                             saveProfile={saveProfile} profile={profile}/> :
                    <ProfileData goToEditMode={activateEditMode} profile={profile} isOwner={isOwner}/>}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}


export default ProfileInfo;