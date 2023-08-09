import {BaseResponseType, instance, ResultCodeForCaptcha, ResultCodes} from "./api";

type MeResponseDataType = {
    id: number
    email:string
    login:string
}
type LoginResponseType = {
    userId: number
}

export const authAPI = {
    me() {
        return instance.get<BaseResponseType<MeResponseDataType>>(`auth/me`)
            .then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<BaseResponseType<LoginResponseType, ResultCodes | ResultCodeForCaptcha>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}