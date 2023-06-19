export type UsersPropsType = {
    id: number,
    photoUrl: string,
    followed: boolean,
    fullName: string,
    status: string,
    location: { city: string, country: string }
}

export type UsersReducerStateType = {
    users: UsersPropsType[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
}

const initialState: UsersReducerStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1
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
        default:
            return state
    }
}
export type FollowACType = ReturnType<typeof followAC>
export type UnfollowACType = ReturnType<typeof unfollowAC>
export type SetUsersACType = ReturnType<typeof setUsersAC>
export type SetCurrentPageACType = ReturnType<typeof setCurrentPageAC>
export type SetTotalUsersCountACType = ReturnType<typeof setTotalUsersCountAC>
export type UsersReducersActionType = FollowACType | UnfollowACType | SetUsersACType | SetCurrentPageACType | SetTotalUsersCountACType
export const followAC = (userID: number) => ({type: "FOLLOW", userID}) as const
export const unfollowAC = (userID: number) => ({type: "UNFOLLOW", userID}) as const
export const setUsersAC = (users: any) => ({type: "SET-USERS", users}) as const
export const setCurrentPageAC = (pageNumber: number) => ({type: "SET-CURRENT-PAGE", pageNumber}) as const
export const setTotalUsersCountAC = (totalUsersCount: number) => ({type: "SET-TOTAL-USERS-COUNT", totalUsersCount}) as const

export default usersReducer