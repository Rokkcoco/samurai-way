import React from 'react';
import s from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UsersPropsType} from "../../redux/usersReducer";

type UsersType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: UsersPropsType[]
    follow: (userID: number) => void
    unfollow: (userID: number) => void
}
const Users = (props:UsersType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div>
                {pages.map(t => {
                    return <span className={props.currentPage === t ? s.selectedPage : ""}
                                 onClick={(e) => props.onPageChanged(t)}>{t}</span>
                })}
            </div>
            {props.users.map(t => <div key={t.id}>
                <span>
                    <div><img alt="social network photos" src={t.photos.small != null ? t.photos.small : userPhoto}
                              className={s.userPhoto}/></div>
                    <div>
                        {t.followed
                            ? <button onClick={() => props.follow(t.id)}>follow</button>
                            : <button onClick={() => props.unfollow(t.id)}>unfollow</button>}
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