

const initialState = {
        users: [
            {id: 1, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmO_Dk5tf21dkiT_2VR3QblcmrWB9dzyV9XQ&usqp=CAU", followed: true, fullName: "Dmitry", status: "I'm a boss", location: {city: "Minsk", country: "Belarus"}},
            {id: 2, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmO_Dk5tf21dkiT_2VR3QblcmrWB9dzyV9XQ&usqp=CAU", followed: false, fullName: "Sasha", status: "I'm a boss too", location: {city: "Moscow", country: "Russia"}},
            {id: 3, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmO_Dk5tf21dkiT_2VR3QblcmrWB9dzyV9XQ&usqp=CAU", followed: true, fullName: "Valera", status: "No, I'm a boss", location: {city: "Kiev", country: "Ukraine"}},
            {id: 4, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmO_Dk5tf21dkiT_2VR3QblcmrWB9dzyV9XQ&usqp=CAU", followed: false, fullName: "Andrew", status: "Nope, I'm a boss", location: {city: "London", country: "UK"}},
        ]
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