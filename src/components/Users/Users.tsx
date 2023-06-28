import React from 'react';
import s from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UsersPropsType} from "../../redux/usersReducer";
import {NavLink} from "react-router-dom";


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
const Users = (props: UsersType) => {
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
                    <div>
                        <NavLink to={'/profile/' + t.id}>
                        <img alt="social network photos" src={t.photos.small != null ? t.photos.small : userPhoto}
                             className={s.userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {t.followed
                            ?
                            <button disabled={props.followingInProgress.some(id => id === t.id)} onClick={() =>{
                                props.unfollow(t.id)
                            }}>unfollow</button>
                            :<button disabled={props.followingInProgress.some(id => id === t.id)} onClick={() => {
                                props.follow(t.id)
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