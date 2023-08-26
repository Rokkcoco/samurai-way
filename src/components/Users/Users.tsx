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



export const Users = () => {

    const totalUsersCount = useAppSelector(getTotalUsersCount)
    const currentPage = useAppSelector(getCurrentPage)
    const pageSize = useAppSelector(getPageSize)
    const filter = useAppSelector(getUsersFilter)
    const users = useAppSelector(getUsers)
    const followingInProgress = useAppSelector(getFollowingInProgress)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
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

