import React from 'react';
import s from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UsersPropsType} from "../../redux/usersReducer";
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";


type UsersType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: UsersPropsType[]
    followingInProgress: Number[]
    follow: (userID: number) => void
    unfollow: (userID: number) => void
}
const Users = ({totalUsersCount, pageSize ,currentPage, onPageChanged ,users ,followingInProgress ,follow, unfollow}: UsersType) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged}/>
            {users.map(t => <div key={t.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + t.id}>
                        <img alt="social network photos" src={t.photos.small != null ? t.photos.small : userPhoto}
                             className={s.userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {t.followed
                            ?
                            <button disabled={followingInProgress.some(id => id === t.id)} onClick={() =>{
                                unfollow(t.id)
                            }}>unfollow</button>
                            :<button disabled={followingInProgress.some(id => id === t.id)} onClick={() => {
                                follow(t.id)
                            }}>follow</button>}
                        </div>
                </span>
                <span>
                    <span>
                        <div>{t.name}</div>
                        <div>{t.status}</div>
                    </span>
                    <span>
                        <div>{"t.location.country"}</div>
                        <div>{"t.location.city"}</div>
                    </span>
                </span>

            </div>)}
        </div>

    );
};

export default Users;