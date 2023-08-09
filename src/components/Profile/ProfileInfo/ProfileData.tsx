import React from "react";
import s from "./ProfileInfo.module.css";
import {ContactsType, ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

export const ProfileData = ({profile, isOwner, goToEditMode}: PropsType) => {
    return <div>
        {isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}
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
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
        })}
        </div>
    </div>
}


export type ContactPropsType = {
    contactTitle: string
    contactValue: string
}

export const Contact = ({contactTitle, contactValue}:ContactPropsType) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}