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
}

const initialState: UsersReducerStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
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
        case "TOOGLE-IS-FETCHING":
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}
export type FollowACType = ReturnType<typeof follow>
export type UnfollowACType = ReturnType<typeof unfollow>
export type SetUsersACType = ReturnType<typeof setUsers>
export type SetCurrentPageACType = ReturnType<typeof setCurrentPage>
export type SetTotalUsersCountACType = ReturnType<typeof setTotalUsersCount>
export type ToogleIsFetchingACType = ReturnType<typeof toggleIsFetching>
export type UsersReducersActionType = FollowACType | UnfollowACType | SetUsersACType | SetCurrentPageACType | SetTotalUsersCountACType | ToogleIsFetchingACType
export const follow = (userID: number) => ({type: "FOLLOW", userID}) as const
export const unfollow = (userID: number) => ({type: "UNFOLLOW", userID}) as const
export const setUsers = (users: any) => ({type: "SET-USERS", users}) as const
export const setCurrentPage = (pageNumber: number) => ({type: "SET-CURRENT-PAGE", pageNumber}) as const
export const setTotalUsersCount = (totalUsersCount: number) => ({type: "SET-TOTAL-USERS-COUNT", totalUsersCount}) as const
export const toggleIsFetching = (isFetching: boolean) => ({type:"TOOGLE-IS-FETCHING", isFetching}) as const

export default usersReducer