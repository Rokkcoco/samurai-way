import React from 'react';
import s from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";

const Users = () => {
    let pagesCount = Math.ceil(this.props.currentPage / this.props.pageSize)
    let pages = []
    for (let i = 0; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
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

    );
};

export default Users;