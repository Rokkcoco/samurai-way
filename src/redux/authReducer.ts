import {authAPI} from "../api/api";
import {AppThunk} from "./redux-store";
import {UseFormSetError} from "react-hook-form";
import {LoginFormTypes} from "../components/Login/Login";


type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
//& {isFetching:boolean}
const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state: InitialStateType = initialState, action: AuthReducerActionsType): InitialStateType => {
    switch (action.type) {
        case "samurai-way/auth/SET-USER-DATA":
            return {...state, ...action.payload, isAuth: action.payload.isAuth}
        default:
            return state
    }
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: "samurai-way/auth/SET-USER-DATA",
    payload: {userId, email, login, isAuth}
}) as const

//нужно добавить именно return в начале функции чтобы вернуть наружу результат резолва промиса, но он у нас undefined т.к. ничем не резолвим
export const getAuthUserData = (): AppThunk => async (dispatch) => {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        const {login, id, email} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

//можно было добавить return вначале чтобы функция вернула результат промиса наружу
//так же добавить ошибку или return со значением в самом промисе
export const login = (email: string, password: string, rememberMe: boolean, setError: UseFormSetError<LoginFormTypes>): AppThunk => {
   return async (dispatch) => {
        const response = await authAPI.login(email, password, rememberMe)
        console.log(response)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            const message = response.data.messages.length > 0 ? response.data.messages[0] : "Some Error"
            setError("email", {message})
        }
    }
}
export const logout = (): AppThunk => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}


type AuthReducerActionsType = SetUserDataACType
type SetUserDataACType = ReturnType<typeof setAuthUserData>

export default authReducer