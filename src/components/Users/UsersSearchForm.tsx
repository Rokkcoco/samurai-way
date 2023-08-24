import {useForm} from "react-hook-form";
import React, {memo} from "react";
import {FilterType} from "../../redux/users-reducer";
type Props = {
    onFilterChanged: (filter: FilterType) => void
}
type FormType = {
    term: string
    friend: "null" | "true" | "false"
}
export const UsersSearchForm = memo(({onFilterChanged}:Props) => {
    const {register, handleSubmit} = useForm<FormType>({defaultValues: {term: "", friend: "null"}})
    const onSubmit = (data: FormType) => {
        onFilterChanged({term: data.term, friend: data.friend === "null" ? null : data.friend === "true"})
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input type="text" {...register("term")}/>
                <select {...register("friend")}>
                    <option value="false">All users</option>
                    <option value="true">Only followed</option>
                </select>
                <button>Search</button>
            </div>
        </form>

    )
})