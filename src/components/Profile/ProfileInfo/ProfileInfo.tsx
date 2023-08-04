import React, {ChangeEvent, useState} from "react";
import s from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/userPhoto.png"
import ProfileDataForm from "./ProfileDataForm";


//если профайл нал или андефайнед
const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}:any):JSX.Element => {

    const [editMode, setEditMode] = useState(false)

    const activateEditMode = () => setEditMode(true)


    if (!profile) return <Preloader/>


    const onMainPhotoSelected = (e:ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    const disableEditMode = () => setEditMode(false)

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img alt="avatar" src={profile.photos.large || userPhoto} className={s.mainPhoto} />
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                {editMode ? <ProfileDataForm disableEditMode={disableEditMode} saveProfile={saveProfile} profile={profile}/> : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={activateEditMode}/>}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}

type ContactPropsType = {
    contactTitle:string
    contactValue: string
}

const ProfileData = ({profile, isOwner, goToEditMode}:any) => {
   return <div>
       {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
        <div>
            <b>Full name</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
        </div>
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>
        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
    </div>
}

export const Contact = ({contactTitle, contactValue}:ContactPropsType) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;