import React from 'react';
import s from "./Users.module.css"
import axios from "axios"

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
export const Users = ({users, follow, unfollow, setUsers}: UsersType): JSX.Element => {

    if (users.length === 0) {
        axios.get<any, any>("https://social-network.samuraijs.com/api/1.0").then(response => {
            debugger
            setUsers(response)
        })

    }
    // [{
    //     id: 1,
    //     photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmO_Dk5tf21dkiT_2VR3QblcmrWB9dzyV9XQ&usqp=CAU",
    //     followed: true,
    //     fullName: "Dmitry",
    //     status: "I'm a boss",
    //     location: {city: "Minsk", country: "Belarus"}
    // },
    //     {
    //         id: 2,
    //         photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmO_Dk5tf21dkiT_2VR3QblcmrWB9dzyV9XQ&usqp=CAU",
    //         followed: false,
    //         fullName: "Sasha",
    //         status: "I'm a boss too",
    //         location: {city: "Moscow", country: "Russia"}
    //     },
    //     {
    //         id: 3,
    //         photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmO_Dk5tf21dkiT_2VR3QblcmrWB9dzyV9XQ&usqp=CAU",
    //         followed: true,
    //         fullName: "Valera",
    //         status: "No, I'm a boss",
    //         location: {city: "Kiev", country: "Ukraine"}
    //     },
    //     {
    //         id: 4,
    //         photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmO_Dk5tf21dkiT_2VR3QblcmrWB9dzyV9XQ&usqp=CAU",
    //         followed: false,
    //         fullName: "Andrew",
    //         status: "Nope, I'm a boss",
    //         location: {city: "London", country: "UK"}
    //     },
    // ]

    return (
        <div>
            {users.map(t => <div key={t.id}>
                <span>
                    <div><img alt="picture" src={t.photoUrl} className={s.userPhoto}/></div>
                    <div>
                        {t.followed
                            ? <button onClick={() => follow(t.id)}>follow</button>
                            : <button onClick={() => unfollow(t.id)}>unfollow</button>}
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
    );
};

