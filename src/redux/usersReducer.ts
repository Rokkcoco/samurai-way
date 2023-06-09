


const initialState = {
        users: []
    }
//Можно сделать блочную видимость как в ADD POST {} чтобы переменная оттуда не пересекалась с другой
const usersReducer = (state = initialState, action: UsersReducersActionType) => {
    switch (action.type) {
        case "FOLLOW":
            return {...state, users: state.users.map(t => t.id === action.userID ? {...t, followed: true} : t)}
        case "UNFOLLOW":
            return {...state, users: state.users.map(t => t.id === action.userID ? {...t, followed: false} : t)}
        case "SET-USERS":
        return {...state, users: [...state.users, ...action.users]}
        default:
            return state
    }
}
type FollowACType = ReturnType<typeof followAC>
type UnfollowACType = ReturnType<typeof unfollowAC>
type setUsersACType = ReturnType<typeof setUsersAC>
type UsersReducersActionType = FollowACType | UnfollowACType | setUsersACType
export const followAC = (userID: number) => ({type: "FOLLOW", userID}) as const
export const unfollowAC = (userID: number) => ({type: "UNFOLLOW", userID}) as const
export const setUsersAC = (users:any) => ({type: "SET-USERS", users}) as const

export default usersReducer