import {useForm} from "react-hook-form";
import React, {memo, useEffect} from "react";
import {FilterType} from "../../redux/users-reducer";
import {useAppSelector} from "../../redux/redux-store";
import {getUsersFilter} from "../../redux/users-selectors";

type Props = {
    onFilterChanged: (filter: FilterType) => void
}
type FriendFormType = "null" | "true" | "false";
type FormType = {
    term: string
    friend: FriendFormType
}
export const UsersSearchForm = memo(({onFilterChanged}: Props) => {
    const filter = useAppSelector(getUsersFilter)
    const {register, handleSubmit, setValue} = useForm<FormType>({
        defaultValues: {
            term: filter.term,
            friend: String(filter.friend) as FriendFormType
        }
    })
    const onSubmit = (data: FormType) => {
        onFilterChanged({
            term: data.term,
            friend: data.friend === "null" ? null : data.friend === "true"
        })
    }
    useEffect(() => {

        setValue("term", filter.term)
        setValue("friend", String(filter.friend) as FriendFormType)
    }, [filter]);
    console.log(filter)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input type="text" {...register("term")}/>
                <select {...register("friend")}>
                    <option value="null">All users</option>
                    <option value="true">Only followed</option>
                    <option value="false">Only unfollowed</option>
                </select>
                <button>Search</button>
            </div>
        </form>

    )
})