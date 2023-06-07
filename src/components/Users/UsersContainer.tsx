import {connect} from "react-redux";
import {Users} from "./Users";
import {followAC, setUsersAC, unfollowAC} from "../../redux/usersReducer";


const mapStateToProps = (state: any) => {
    return {
        users: state.usersPage.users
    }
}

const mapDispatchToProps = (dispatch:any ) => {
    return {
        follow: (userID:number) => {
            dispatch(followAC(userID))
        },
        unfollow: (userID:number) => {
            dispatch(unfollowAC(userID))
        },
        setUsers: (users:any) => {
            dispatch(setUsersAC(users))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
