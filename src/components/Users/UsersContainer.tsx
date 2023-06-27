import {connect} from "react-redux";
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching, toggleIsFollowingProgress,
    unfollow,
    UsersPropsType
} from "../../redux/usersReducer";
import {AppStateType} from "../../redux/redux-store";
import React from "react";
import Users from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";


type MapStateToPropsType = {
    users: UsersPropsType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Number[]
}

type MapDispatchToPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: UsersPropsType[]) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleIsFollowingProgress: (isFollowing: boolean, userID: number) => void
}

export type UsersPropType = MapStateToPropsType & MapDispatchToPropsType

export class UsersContainer extends React.Component<UsersPropType> {
    componentDidMount(): void {
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                console.log(data)
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            }
        )
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
                console.log(data)
                this.props.setUsers(data.items)
            }
        )
    }


    render(): JSX.Element {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      onPageChanged={this.onPageChanged}
                      users={this.props.users}
                   toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
                   followingInProgress={this.props.followingInProgress}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}/>
            </>
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress
})



export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    toggleIsFollowingProgress
})(UsersContainer)
