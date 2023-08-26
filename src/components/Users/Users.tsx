import React, {useEffect} from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, follow, requestUsers, unfollow} from "../../redux/users-reducer";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";
import {useAppDispatch, useAppSelector} from "../../redux/redux-store";
import {useSearchParams} from "react-router-dom";

type QueryParamsType = {
    term?: string
    friend?: string
    page?:string
}
export const Users = () => {

    const totalUsersCount = useAppSelector(getTotalUsersCount)
    const currentPage = useAppSelector(getCurrentPage)
    const pageSize = useAppSelector(getPageSize)
    const filter = useAppSelector(getUsersFilter)
    const users = useAppSelector(getUsers)
    const followingInProgress = useAppSelector(getFollowingInProgress)
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const parsed = Object.fromEntries(searchParams)

    useEffect(() => {
       const queryURL:QueryParamsType = {}
        if (!!filter.term) queryURL.term = filter.term
        if (filter.friend !== null) queryURL.friend = String(filter.friend)
        if (currentPage !== 1) queryURL.page = String(currentPage)
        setSearchParams(queryURL)

    }, [filter, currentPage]);


    useEffect(() => {

        let friend: boolean | null = null
        if (parsed.friend === "true") {
            friend = true
        }

        if (parsed.friend === "false") {
            friend = false
        }

        const actualPage = +parsed.page || currentPage

        let actualFriend = friend || filter.friend
        if (friend === false) {
            actualFriend = friend
        }

        const actualTerm = parsed.term || filter.term
        const newFilter = {term: actualTerm, friend: actualFriend}
        dispatch(requestUsers(actualPage, pageSize, newFilter))
    }, []);

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const followCallback = (userID: number) => {
        dispatch(follow(userID))
    }
    const unfollowCallback = (userID: number) => {
        dispatch(unfollow(userID))
    }

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
                       onPageChanged={onPageChanged}/>
            {users.map(t => <User key={t.id} user={t} followingInProgress={followingInProgress} follow={followCallback}
                                  unfollow={unfollowCallback}/>)}
        </div>

    );
};

