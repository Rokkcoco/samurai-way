

type InitialStateType = {
    userId: null | number
    email: null | string
    login: null | string
}
//& {isFetching:boolean}
const initialState= {
    userId: null,
    email: null,
    login: null
}

const authReducer = (state: typeof initialState= initialState, action: AuthReducerActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-USER-DATA":
            return {...state, ...action.data}
        default:
            return state
    }
}

export const setAuthUserData = (userId: number, email: string, login: string) => ({type: "SET-USER-DATA", data: {userId, email, login}}) as const

type AuthReducerActionsType = SetUserDataACType
type SetUserDataACType = ReturnType<typeof setAuthUserData>

export default authReducer