import {connect} from "react-redux";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    unfollowAC,
    UsersPropsType,
    UsersReducerStateType
} from "../../redux/usersReducer";
import {AppStateType} from "../../redux/redux-store";
import React from "react";
import axios from "axios/index";
import Users from "./Users";
import {Dispatch} from "redux";


type UsersType = UsersReducerStateType & {
    follow: (id: number) => void
    unfollow: (id: number) => void
    setUsers: (users: UsersPropsType) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
}

type MapStateToPropsType = {
    users: UsersPropsType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
}

type MapDispatchToPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: UsersPropsType[]) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
}

export type UsersPropType = MapDispatchToPropsType & MapDispatchToPropsType

export class UsersContainer extends React.Component<UsersType> {
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


        return <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      onPageChanged={this.onPageChanged}
                      users={this.props.users}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
