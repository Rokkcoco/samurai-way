import {connect} from "react-redux";
import {Users} from "./Users";
import {followAC, setUsersAC, unfollowAC} from "../../redux/usersReducer";
import {AppStateType} from "../../redux/redux-store";


const mapStateToProps = (state: AppStateType) => ({
        users: state.usersPage.users
    })

const mapDispatchToProps = (dispatch:any ) => ({
        follow: (userID:number) => {
            dispatch(followAC(userID))
        },
        unfollow: (userID:number) => {
            dispatch(unfollowAC(userID))
        },
        setUsers: (users:any) => {
            dispatch(setUsersAC(users))
        }
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
