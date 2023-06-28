import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

export type UsersPropsType = {
    "name": string,
    "id": number,
    "photos": {
        "small": string,
        "large": string
    },
    "status": string,
    "followed": boolean
}

export type UsersReducerStateType = {
    users: UsersPropsType[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean
    followingInProgress: Number[]
}

const initialState: UsersReducerStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

//Будем перезатирать массив в users на тот что пришел
//Можно сделать блочную видимость как в ADD POST {} чтобы переменная оттуда не пересекалась с другой
const usersReducer = (state: UsersReducerStateType = initialState, action: UsersReducersActionType): UsersReducerStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {...state, users: state.users.map(t => t.id === action.userID ? {...t, followed: true} : t)}
        case "UNFOLLOW":
            return {...state, users: state.users.map(t => t.id === action.userID ? {...t, followed: false} : t)}
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
export const setUsers = (users: any) => ({type: "SET-USERS", users}) as const
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

export const getUsers = (currentPage: number, pageSize: number) => (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false))
            dispatch(setCurrentPage(currentPage))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        }
    )
}

export const follow = (userID: number) => (dispatch: Dispatch) => {
    dispatch(toggleIsFollowingProgress(true, userID))
    usersAPI.follow(userID)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(followSuccess(userID))
            }
            dispatch(toggleIsFollowingProgress(false, userID))
        })
}

export const unfollow = (userID: number) => (dispatch: Dispatch) => {
    dispatch(toggleIsFollowingProgress(true, userID))
    usersAPI.unfollow(userID)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(unfollowSuccess(userID))
            }
            dispatch(toggleIsFollowingProgress(false, userID))
        })
}

export default usersReducer