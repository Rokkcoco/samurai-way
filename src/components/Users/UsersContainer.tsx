import {connect} from "react-redux";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    toogleIsFetchingAC,
    unfollowAC,
    UsersPropsType
} from "../../redux/usersReducer";
import {AppStateType} from "../../redux/redux-store";
import React from "react";
import axios from "axios";
import Users from "./Users";
import {Dispatch} from "redux";
import {Preloader} from "../common/Preloader/Preloader";


type MapStateToPropsType = {
    users: UsersPropsType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}

type MapDispatchToPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: UsersPropsType[]) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
}

export type UsersPropType = MapStateToPropsType & MapDispatchToPropsType

export class UsersContainer extends React.Component<UsersPropType> {
    componentDidMount(): void {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
                console.log(response)
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            }
        )
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.toggleIsFetching(false)
                console.log(response)
                this.props.setUsers(response.data.items)
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
    isFetching: state.usersPage.isFetching
})

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => ({
    follow: (userID: number) => {
        dispatch(followAC(userID))
    },
    unfollow: (userID: number) => {
        dispatch(unfollowAC(userID))
    },
    setUsers: (users: UsersPropsType[]) => {
        dispatch(setUsersAC(users))
    },
    setCurrentPage: (pageNumber: number) => {
        dispatch(setCurrentPageAC(pageNumber))
    },
    setTotalUsersCount: (totalUsersCount: number) => {
        dispatch(setTotalUsersCountAC(totalUsersCount))
    },
    toggleIsFetching: (isFetching: boolean) => {
        dispatch(toogleIsFetchingAC(isFetching))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
