import React from 'react';
import s from "./Users.module.css"
import axios from "axios"
import userPhoto from "../../assets/images/user.png"
import {UsersPropsType, UsersReducerStateType} from "../../redux/usersReducer";


type UsersType = UsersReducerStateType & {
    follow: (id: number) => void
    unfollow: (id: number) => void
    setUsers: (users: UsersPropsType) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
}

//если наш констуктор не делает ничего нового кроме как перебрасывания конструктору супер , классу от которого наследуемся, то конструктор можно не писать
export class Users extends React.Component<UsersType> {
    componentDidMount(): void {
        axios.get<any, any>(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
                console.log(response)
                debugger
                this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalCount)
            }
        )
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get<any, any>(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
                console.log(response)
                debugger
                this.props.setUsers(response.data.items)
            }
        )
    }


    render(): JSX.Element {
        let pagesCount = Math.ceil(this.props.currentPage / this.props.pageSize)
        let pages = []
        for (let i = 0; i <= pagesCount; i++) {
            pages.push(i)
        }

        return <div>
            <div>
                {pages.map(t => {
                    return <span className={this.props.currentPage === t ? s.selectedPage : ""}
                                 onClick={(e) => this.onPageChanged(t)}>{t}</span>
                })}
            </div>
            {this.props.users.map(t => <div key={t.id}>
                <span>
                    <div><img alt="picture" src={t.photos.small != null ? t.photos.small : userPhoto}
                              className={s.userPhoto}/></div>
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

