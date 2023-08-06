import React from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";


type UsersType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: UserType[]
    followingInProgress: number[]
    follow: (userID: number) => void
    unfollow: (userID: number) => void
}
const Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, followingInProgress, follow, unfollow}: UsersType) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
                       onPageChanged={onPageChanged}/>
            {users.map(t => <User key={t.id} user={t} followingInProgress={followingInProgress} follow={follow}
                                  unfollow={unfollow}/>)}
        </div>

    );
};

export default Users;