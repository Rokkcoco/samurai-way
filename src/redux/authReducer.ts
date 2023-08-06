import {authAPI, securityAPI} from "../api/api";
import {AppThunk} from "./redux-store";
import {UseFormSetError} from "react-hook-form";
import {LoginFormTypes} from "../components/Login/Login";


type InitialStateType = typeof initialState
//& {isFetching:boolean}
const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as null | string
}

const authReducer = (state: InitialStateType = initialState, action: AuthReducerActionsType): InitialStateType => {
    switch (action.type) {
        case "samurai-way/auth/SET-USER-DATA":
        case "samurai-way/auth/GET-CAPTCHA-SUCCESS":
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: "samurai-way/auth/SET-USER-DATA",
    payload: {userId, email, login, isAuth}}) as const

export const getCaptchaUrlSuccess = (captchaUrl:string | null) => ({
    type: "samurai-way/auth/GET-CAPTCHA-SUCCESS",
    payload: {captchaUrl}}) as const

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
export const login = (email: string, password: string, rememberMe: boolean, setError: UseFormSetError<LoginFormTypes>, captcha: string): AppThunk => {
   return async (dispatch) => {
        const response = await authAPI.login(email, password, rememberMe, captcha)
        console.log(response)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        }
        else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
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
export const getCaptchaUrl = (): AppThunk => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaURL = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaURL))

}


type AuthReducerActionsType = SetUserDataActionType | GetCaptchaUrlSuccessActionType
type SetUserDataActionType = ReturnType<typeof setAuthUserData>
type GetCaptchaUrlSuccessActionType = ReturnType<typeof getCaptchaUrlSuccess>

export default authReducer