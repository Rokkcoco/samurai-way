import {connect} from "react-redux";
import {follow, requestUsers, unfollow} from "../../redux/users-reducer";
import {AppRootStateType} from "../../redux/redux-store";
import React from "react";
import Users from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
import {UserType} from "../../types/types";


type MapStateToPropsType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

type MapDispatchToPropsType = {
    requestUsers: (pageNumber: number, pageSize: number) => void
    follow: (userID: number) => void
    unfollow: (userID: number) => void
}

export type PropType = MapStateToPropsType & MapDispatchToPropsType
export class UsersContainer extends React.Component<PropType> {
    componentDidMount(): void {
        const {currentPage, pageSize} = this.props
        this.props.requestUsers(currentPage, pageSize)
    }

    //в классовой компоненте лучше использовать деструктуризацию пропсов
    onPageChanged = (pageNumber: number) => {
    const {pageSize} = this.props
     this.props.requestUsers(pageNumber, pageSize)
    }


    render(): JSX.Element {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      onPageChanged={this.onPageChanged}
                      users={this.props.users}
                   followingInProgress={this.props.followingInProgress}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                      />
            </>
    }
}
//
// const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
//     users: state.usersPage.users,
//     pageSize: state.usersPage.pageSize,
//     totalUsersCount: state.usersPage.totalUsersCount,
//     currentPage: state.usersPage.currentPage,
//     isFetching: state.usersPage.isFetching,
//     followingInProgress: state.usersPage.followingInProgress
// })
const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    users:getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
})

//mapDispatchToProps создает колбэк за нас


export default compose<React.ComponentType>(
    connect<MapStateToPropsType,MapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, {
        requestUsers,
        follow,
        unfollow
    }),
    withAuthRedirect)(UsersContainer)

