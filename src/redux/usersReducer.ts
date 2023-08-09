import {AppThunkType, InferActionsType} from "./redux-store";
import {Dispatch} from "redux";
import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";
import {usersAPI} from "../api/users-api";


const initialState = {
    users: [] as UserType[],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as number[] //array of users IDs
}

//Будем перезатирать массив в users на тот что пришел
//Можно сделать блочную видимость как в ADD POST {} чтобы переменная оттуда не пересекалась с другой
const usersReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "usersPage/FOLLOW":
            return {...state, users: updateObjectInArray(state.users, action.userID, "id", {followed:true})}
        case "usersPage/UNFOLLOW":
            return {...state, users: updateObjectInArray(state.users, action.userID, "id", {followed:false})}
        case "usersPage/SET-USERS":
            return {...state, users: action.users}
        case "usersPage/SET-CURRENT-PAGE":
            return {...state, currentPage: action.pageNumber}
        case "usersPage/SET-TOTAL-USERS-COUNT":
            return {...state, totalUsersCount: action.totalUsersCount}
        case "usersPage/TOGGLE-IS-FETCHING":
            return {...state, isFetching: action.isFetching}
        case "usersPage/TOGGLE-IS-FOLLOWING-PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFollowing ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id !== action.userID)
            }
        default:
            return state
    }
}

export const actions = {
    followSuccess : (userID: number) => ({type: "usersPage/FOLLOW", userID} as const),
    unfollowSuccess : (userID: number) => ({type: "usersPage/UNFOLLOW", userID}as const) ,
    setUsers : (users: UserType[]) => ({type: "usersPage/SET-USERS", users}as const) ,
    setCurrentPage : (pageNumber: number) => ({type: "usersPage/SET-CURRENT-PAGE", pageNumber}as const) ,
    setTotalUsersCount : (totalUsersCount: number) => ({
        type: "usersPage/SET-TOTAL-USERS-COUNT",
        totalUsersCount
    }as const),
    toggleIsFetching : (isFetching: boolean) => ({type: "usersPage/TOGGLE-IS-FETCHING", isFetching}as const),
    toggleIsFollowingProgress : (isFollowing: boolean, userID: number) => ({type: "usersPage/TOGGLE-IS-FOLLOWING-PROGRESS",
        isFollowing,
        userID
    }as const)
}

export const requestUsers = (page: number, pageSize: number): ThunkType => async (dispatch) => {
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

export const follow = (userID: number): ThunkType => async (dispatch) => {
   await followUnfollowFlow(dispatch, userID, usersAPI.follow.bind(usersAPI), actions.followSuccess )
}

export const unfollow = (userID: number): ThunkType => async (dispatch) => {
   await followUnfollowFlow(dispatch, userID, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess )

}

export default usersReducer
type InitialStateType = typeof initialState
type ThunkType = AppThunkType<ActionsType>
export type ActionsType = InferActionsType<typeof actions>