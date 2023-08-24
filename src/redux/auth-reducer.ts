import {ResultCodeForCaptcha, ResultCodes} from "../api/api";
import {AppThunkType, InferActionsType} from "./redux-store";
import {UseFormSetError} from "react-hook-form";
import {LoginFormTypes} from "../components/Login/Login";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";

//& {isFetching:boolean}
const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as null | string
}

const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "auth/SET-USER-DATA":
        case "auth/GET-CAPTCHA-SUCCESS":
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: "auth/SET-USER-DATA",
        payload: {userId, email, login, isAuth}}  as const),
    getCaptchaUrlSuccess : (captchaUrl:string | null) => ({
        type: "auth/GET-CAPTCHA-SUCCESS",
        payload: {captchaUrl}}) as const
}

//нужно добавить именно return в начале функции чтобы вернуть наружу результат резолва промиса, но он у нас undefined т.к. ничем не резолвим
export const getAuthUserData = ():ThunkType => async (dispatch) => {
    const data = await authAPI.me()
    if (data.resultCode === ResultCodes.Success) {
        const {login, id, email} = data.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

//можно было добавить return вначале чтобы функция вернула результат промиса наружу
//так же добавить ошибку или return со значением в самом промисе
export const login = (email: string, password: string, rememberMe: boolean, setError: UseFormSetError<LoginFormTypes>, captcha: string| null): ThunkType => async (dispatch) => {
        const data = await authAPI.login(email, password, rememberMe, captcha)
        if (data.resultCode === ResultCodes.Success) {
            await dispatch(getAuthUserData())
        }
        else {
            if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
               await dispatch(getCaptchaUrl())
            }
            const message = data.messages.length > 0 ? data.messages[0] : "Some Error"
            setError("email", {message})
        }

}
export const logout = (): ThunkType => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === ResultCodes.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    dispatch(actions.getCaptchaUrlSuccess(data.url))
}

export default authReducer
type InitialStateType = typeof initialState
type ThunkType = AppThunkType<ActionsType>
type ActionsType = InferActionsType<typeof actions>