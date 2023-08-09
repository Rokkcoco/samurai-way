import React from "react";
import s from "./ProfileInfo.module.css";
import {useForm} from "react-hook-form";
import {ContactsType, ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType
    disableEditMode: () => void
    saveProfile: (profile: ProfileType) => Promise<void>
}

const ProfileDataForm = ({profile, disableEditMode, saveProfile}: PropsType) => {

    const {
        register,
        handleSubmit,
        formState:{ errors},
        setError } = useForm<ProfileType>({defaultValues: profile})

    const onSubmit = async (data: ProfileType) => {
        try {
           await saveProfile(data)
            disableEditMode()
        } catch(errors:any) {
            errors.forEach((error:string) => {
                let errorName =  error.slice(
                    error.indexOf(">") + 1,
                    error.indexOf(")")
                )
                    .toLocaleLowerCase();
                if (/\babout\b/gi.test(errorName)) {
                    setError("aboutMe", {message: error})
                }
                if (/\bjob\b/gi.test(errorName)) {
                    setError("lookingForAJobDescription", {message:error})
                }
                if (errorName === "mainlink") {
                    errorName = "mainLink"
                }
                setError("contacts." + errorName as keyof ProfileType, {message: error})
            })
        }
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div><button>save</button></div>
        <div>
            <b>Full name</b>:
            <div>
                <input type="text" placeholder={"Your name"} {...register("fullName")}/></div>
            {errors.fullName && <p>{errors.fullName.message}</p>}
        </div>
        <div>
            <b>Looking for a job</b>:
            <div><input type="checkbox"  {...register("lookingForAJob")}/></div>
            {errors.lookingForAJob && <p>{errors.lookingForAJob.message}</p>}
        </div>
            <div>
                <b>My professional skills</b>:
                <div><textarea  placeholder={"My professional skills"} {...register("lookingForAJobDescription")}/></div>
                {errors.lookingForAJobDescription && <p>{errors.lookingForAJobDescription.message}</p>}
            </div>
        <div>
            <b>About me</b>:
            <div><textarea  placeholder={"About me"} {...register("aboutMe")}/></div>
            {errors.aboutMe && <p>{errors.aboutMe.message}</p>}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={s.contact}>
                <b>{key}:<input  placeholder={key} type="text" {...register(`contacts.${key}`as keyof ProfileType)}/></b>
                { errors.contacts ? errors.contacts[key as keyof ContactsType] && <p>{errors.contacts[key as keyof ContactsType]?.message}</p> : null}
            </div>
        })}
        </div>
    </form>
}

export default ProfileDataForm