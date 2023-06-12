import {connect} from "react-redux";
import {Users} from "./Users";
import {followAC, setCurrentPageAC, setTotalUsersCountAC, setUsersAC, unfollowAC} from "../../redux/usersReducer";
import {AppStateType} from "../../redux/redux-store";


const mapStateToProps = (state: AppStateType) => ({
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage
})

const mapDispatchToProps = (dispatch: any) => ({
    follow: (userID: number) => {
        dispatch(followAC(userID))
    },
    unfollow: (userID: number) => {
        dispatch(unfollowAC(userID))
    },
    setUsers: (users: any) => {
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
