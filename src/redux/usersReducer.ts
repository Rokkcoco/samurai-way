import {usersAPI} from "../api/api";
import {AppThunk, InferActionsType} from "./redux-store";
import {Dispatch} from "redux";
import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";


const initialState = {
    users: [] as UserType[],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as number[] //array of users IDs
}
type InitialStateType = typeof initialState
//Будем перезатирать массив в users на тот что пришел
//Можно сделать блочную видимость как в ADD POST {} чтобы переменная оттуда не пересекалась с другой
const usersReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {...state, users: updateObjectInArray(state.users, action.userID, "id", {followed:true})}
        case "UNFOLLOW":
            return {...state, users: updateObjectInArray(state.users, action.userID, "id", {followed:false})}
        case "SET-USERS":
            return {...state, users: action.users}
        case "SET-CURRENT-PAGE":
            return {...state, currentPage: action.pageNumber}
        case "SET-TOTAL-USERS-COUNT":
            return {...state, totalUsersCount: action.totalUsersCount}
        case "TOGGLE-IS-FETCHING":
            return {...state, isFetching: action.isFetching}
        case "TOGGLE-IS-FOLLOWING-PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFollowing ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id !== action.userID)
            }
        default:
            return state
    }
}

export type ActionsType = InferActionsType<typeof actions>


export const actions = {
    followSuccess : (userID: number) => ({type: "FOLLOW", userID} as const),
    unfollowSuccess : (userID: number) => ({type: "UNFOLLOW", userID}as const) ,
    setUsers : (users: UserType[]) => ({type: "SET-USERS", users}as const) ,
    setCurrentPage : (pageNumber: number) => ({type: "SET-CURRENT-PAGE", pageNumber}as const) ,
    setTotalUsersCount : (totalUsersCount: number) => ({
        type: "SET-TOTAL-USERS-COUNT",
        totalUsersCount
    }as const),
    toggleIsFetching : (isFetching: boolean) => ({type: "TOGGLE-IS-FETCHING", isFetching}as const),
    toggleIsFollowingProgress : (isFollowing: boolean, userID: number) => ({type: "TOGGLE-IS-FOLLOWING-PROGRESS",
        isFollowing,
        userID
    }as const)
}


export const requestUsers = (page: number, pageSize: number): AppThunk => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))
    const data = await usersAPI.getUsers(page, pageSize)
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setCurrentPage(page))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
}

const followUnfollowFlow = async(dispatch:Dispatch<ActionsType>, userID: number, apiMethod:(userID:number)=>Promise<any>, actionCreator: typeof actions.followSuccess|typeof actions.unfollowSuccess) => {
    dispatch(actions.toggleIsFollowingProgress(true, userID))
    const response = await apiMethod(userID)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(actions.toggleIsFollowingProgress(false, userID))
}

export const follow = (userID: number): AppThunk => async (dispatch) => {
   await followUnfollowFlow(dispatch, userID, usersAPI.follow.bind(usersAPI), actions.followSuccess )
}

export const unfollow = (userID: number): AppThunk => async (dispatch) => {
   await followUnfollowFlow(dispatch, userID, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess )

}

export default usersReducer