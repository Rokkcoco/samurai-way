import React from 'react';
import s from "./Users.module.css"
import {followAC, unfollowAC} from "../../redux/usersReducer";
type UsersType = {
    users:  {id: number, photoUrl: string, followed: boolean, fullName: string, status: string, location: {city: string, country: string}}[]
}
export const Users = ({users}: UsersType):JSX.Element => {
    return (
        <div>
            {users.map(t => <div key={t.id}>
                <span>
                    <div><img alt="picture" src={t.photoUrl} className={s.userPhoto}/></div>
                    <div>
                        {t.followed
                            ? <button onClick={()=> followAC(t.id)}>follow</button>
                            : <button onClick={()=> unfollowAC(t.id)}>unfollow</button>}
                        </div>
                </span>
                <span>
                    <span>
                        <div>{t.fullName}</div>
                        <div>{t.status}</div>
                    </span>
                    <span>
                        <div>{t.location.country}</div>
                        <div>{t.location.city}</div>
                    </span>
                </span>

            </div>) }
        </div>
    );
};

