import React from 'react';
import s from "./Users.module.css"
import axios from "axios"
import userPhoto from "../../assets/images/user.png"

export type UsersPropsType = {
    id: number,
    photoUrl: string,
    followed: boolean,
    fullName: string,
    status: string,
    location: { city: string, country: string }
}[]

type UsersType = {
    users: UsersPropsType
    follow: (id: number) => void
    unfollow: (id: number) => void
    setUsers: (users: UsersPropsType) => void
}

export class Users extends React.Component {
    constructor(props) {
        super(props);
            axios.get<any, any>("https://social-network.samuraijs.com/api/1.0").then(response => {
                console.log(response)
                debugger
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return <div>
                {this.props.users.map(t => <div key={t.id}>
                <span>
                    <div><img alt="picture" src={t.photos.small != null ? t.photos.small : userPhoto} className={s.userPhoto}/></div>
                    <div>
                        {t.followed
                            ? <button onClick={() => this.props.follow(t.id)}>follow</button>
                            : <button onClick={() => this.props.unfollow(t.id)}>unfollow</button>}
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

                </div>)}
            </div>

    }
}

