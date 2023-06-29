import {Dispatch} from "redux";
import {authAPI} from "../api/api";


type InitialStateType = {
    userId: null | number
    email: null | string
    login: null | string
    isAuth: boolean
}
//& {isFetching:boolean}
const initialState= {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state: typeof initialState= initialState, action: AuthReducerActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-USER-DATA":
            return {...state, ...action.data, isAuth: true}
        default:
            return state
    }
}

export const setAuthUserData = (userId: number, email: string, login: string) => ({type: "SET-USER-DATA", data: {userId, email, login}}) as const
export const getAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.me().then(response => {
            if (response.data.resultCode === 0) {
                const {login, id, email} = response.data.data
                dispatch(setAuthUserData(id, email, login))
            }
        }
    )
}

type AuthReducerActionsType = SetUserDataACType
type SetUserDataACType = ReturnType<typeof setAuthUserData>

export default authReducer