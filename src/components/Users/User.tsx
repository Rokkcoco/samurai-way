import React from 'react';
import s from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UsersPropsType} from "../../redux/usersReducer";
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";


type UserType = {
    user:UsersPropsType
    followingInProgress: Number[]
    follow: (userID: number) => void
    unfollow: (userID: number) => void
}
const User = ({user, followingInProgress, follow, unfollow }: UserType) => {
    return (
        <div>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                        <img alt="social network photos" src={user.photos.small != null ? user.photos.small : userPhoto}
                             className={s.userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ?
                            <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                unfollow(user.id)
                            }}>unfollow</button>
                            : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                follow(user.id)
                            }}>follow</button>}
                        </div>
                </span>
            <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{"t.location.country"}</div>
                        <div>{"t.location.city"}</div>
                    </span>
                </span>

        </div>
    );
};

export default User;