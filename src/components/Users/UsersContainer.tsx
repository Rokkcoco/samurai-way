import {useSelector} from "react-redux";
import React from "react";

import {Preloader} from "../common/Preloader/Preloader";
import {getIsFetching} from "../../redux/users-selectors";
import {Users} from "./Users";


// type MapStateToPropsType = {
//     users: UserType[]
//     pageSize: number
//     currentPage: number
//     isFetching: boolean
//     followingInProgress: number[]
//     filter: FilterType
// }
//
// type MapDispatchToPropsType = {
//     requestUsers: (pageNumber: number, pageSize: number, filter: FilterType) => void
//     follow: (userID: number) => void
//     unfollow: (userID: number) => void
// }
//
// export type PropType = MapStateToPropsType & MapDispatchToPropsType



export const UsersPage = () => {
const isFetching = useSelector(getIsFetching)
    return <>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </>
}

// export class UsersContainer extends React.Component<PropType> {
//     componentDidMount(): void {
//         const {currentPage, pageSize, filter} = this.props
//         this.props.requestUsers(currentPage, pageSize, filter)
//     }
//
//     //в классовой компоненте лучше использовать деструктуризацию пропсов
//     onPageChanged = (pageNumber: number) => {
//         const {pageSize, filter} = this.props
//         this.props.requestUsers(pageNumber, pageSize, filter)
//     }
//
//     onFilterChanged = (filter: FilterType) => {
//         const {pageSize} = this.props
//         this.props.requestUsers(1, pageSize, filter)
//     }
//
//     render(): JSX.Element {
//         return <>
//             {this.props.isFetching ? <Preloader/> : null}
//             <Users
//                    onPageChanged={this.onPageChanged}
//                    users={this.props.users}
//                    followingInProgress={this.props.followingInProgress}
//                    follow={this.props.follow}
//                    unfollow={this.props.unfollow}
//                    onFilterChanged={this.onFilterChanged}
//             />
//         </>
//     }
// }
//
// const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
//     users: getUsers(state),
//     pageSize: getPageSize(state),
//     currentPage: getCurrentPage(state),
//     isFetching: getIsFetching(state),
//     followingInProgress: getFollowingInProgress(state),
//     filter: getUsersFilter(state)
// })
//
// //mapDispatchToProps создает колбэк за нас
//
//
// export default compose<React.ComponentType>(
//     connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, {
//         requestUsers,
//         follow,
//         unfollow
//     }),
//     withAuthRedirect)(UsersContainer)

