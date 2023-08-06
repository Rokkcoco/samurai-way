import {usersAPI} from "../api/api";
import {AppThunk} from "./redux-store";
import {Dispatch} from "redux";
import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";


const initialState = {
    users: [] as UserType[],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Number[] //array of users ID
}
type InitialStateType = typeof initialState
//Будем перезатирать массив в users на тот что пришел
//Можно сделать блочную видимость как в ADD POST {} чтобы переменная оттуда не пересекалась с другой
const usersReducer = (state: InitialStateType = initialState, action: UsersReducersActionType): InitialStateType => {
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
export type FollowACType = ReturnType<typeof followSuccess>
export type UnfollowACType = ReturnType<typeof unfollowSuccess>
export type SetUsersACType = ReturnType<typeof setUsers>
export type SetCurrentPageACType = ReturnType<typeof setCurrentPage>
export type SetTotalUsersCountACType = ReturnType<typeof setTotalUsersCount>
export type ToogleIsFetchingACType = ReturnType<typeof toggleIsFetching>
export type toggleIsFollowingProgressType = ReturnType<typeof toggleIsFollowingProgress>
export type UsersReducersActionType =
    FollowACType
    | UnfollowACType
    | SetUsersACType
    | SetCurrentPageACType
    | SetTotalUsersCountACType
    | ToogleIsFetchingACType
    | toggleIsFollowingProgressType
export const followSuccess = (userID: number) => ({type: "FOLLOW", userID}) as const
export const unfollowSuccess = (userID: number) => ({type: "UNFOLLOW", userID}) as const
export const setUsers = (users: UserType[]) => ({type: "SET-USERS", users}) as const
export const setCurrentPage = (pageNumber: number) => ({type: "SET-CURRENT-PAGE", pageNumber}) as const
export const setTotalUsersCount = (totalUsersCount: number) => ({
    type: "SET-TOTAL-USERS-COUNT",
    totalUsersCount
}) as const
export const toggleIsFetching = (isFetching: boolean) => ({type: "TOGGLE-IS-FETCHING", isFetching}) as const
export const toggleIsFollowingProgress = (isFollowing: boolean, userID: number) => ({
    type: "TOGGLE-IS-FOLLOWING-PROGRESS",
    isFollowing,
    userID
}) as const

export const requestUsers = (page: number, pageSize: number): AppThunk => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    const data = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setCurrentPage(page))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}

const followUnfollowFlow = async(dispatch:Dispatch, userID: number, apiMethod:(userID:number)=>Promise<any>, actionCreator: typeof followSuccess|typeof unfollowSuccess) => {
    dispatch(toggleIsFollowingProgress(true, userID))
    const response = await apiMethod(userID)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(toggleIsFollowingProgress(false, userID))
}

export const follow = (userID: number): AppThunk => async (dispatch) => {
   await followUnfollowFlow(dispatch, userID, usersAPI.follow.bind(usersAPI), followSuccess )
}

export const unfollow = (userID: number): AppThunk => async (dispatch) => {
   await followUnfollowFlow(dispatch, userID, usersAPI.unfollow.bind(usersAPI), unfollowSuccess )

}

export default usersReducer