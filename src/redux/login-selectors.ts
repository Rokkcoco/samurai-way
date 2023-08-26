import {AppRootStateType} from "./redux-store";

export const selectCaptchaUrl = (state:AppRootStateType) => state.auth.captchaUrl
export const selectIsAuth = (state:AppRootStateType) => state.auth.isAuth