import {Dispatch} from "redux";
import {authAPI} from "../api/api";



type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
//& {isFetching:boolean}
const initialState= {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state: InitialStateType = initialState, action: AuthReducerActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-USER-DATA":
            return {...state, ...action.payload, isAuth: action.payload.isAuth}
        default:
            return state
    }
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({type: "SET-USER-DATA", payload: {userId, email, login, isAuth}}) as const
export const getAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.me().then(response => {
            if (response.data.resultCode === 0) {
                const {login, id, email} = response.data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        }
    )
}

export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch)  => {
    authAPI.login(email, password, rememberMe).then(response => {
        console.log(response)
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())
            }
        }
    )
}
export const logout = () => (dispatch: Dispatch) => {
    authAPI.logout().then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        }
    )
}


type AuthReducerActionsType = SetUserDataACType
type SetUserDataACType = ReturnType<typeof setAuthUserData>

export default authReducer