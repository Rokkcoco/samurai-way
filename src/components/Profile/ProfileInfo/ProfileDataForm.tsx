import React from "react";
import s from "./ProfileInfo.module.css";
import {useForm} from "react-hook-form";
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType
    goToEditMode: any
    disableEditMode: any
    saveProfile: any
}
const ProfileDataForm = ({profile, goToEditMode, disableEditMode, saveProfile}: PropsType) => {

    const {
        register,
        handleSubmit,
        formState:{ errors},
        setError } = useForm({defaultValues: profile})

    const onSubmit = async (data: ProfileType) => {
        try {
           await saveProfile(data)
            disableEditMode()
        } catch(error:any) {
            console.log(error)
               let errorName =  error.slice(
                   error.indexOf(">") + 1,
                   error.indexOf(")")
                )
                .toLocaleLowerCase();
            console.log(errorName)
            setError(errorName, error)
        }

    }
//
    return <form onSubmit={handleSubmit(onSubmit)}>
        <div><button onClick={goToEditMode}>save</button></div>
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
                <b>{key}:<input  placeholder={key} type="text" {...register(`contacts.${key}` as any)}/></b>
                {/*{errors.contacts[key] && <p>{errors.contacts[key].message}</p>}*/}
            </div>
        })}
        </div>
    </form>
}
//value={profile.aboutMe}
//value={profile.lookingForAJobDescription}
//value={profile.lookingForAJob ? "yes" : "no"}
//value={profile.fullName}
//value={profile.contacts[key]}
export default ProfileDataForm