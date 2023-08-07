import axios from "axios";
import {ProfileType} from "../types/types";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials:true,
    headers: {
        "API-KEY": "654ee2dd-0295-4c54-aa15-a75a7c846bf1"
    }
})

export enum ResultCodes {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: { id: number, email:string, login:string }
    resultCode: ResultCodes
    messages: string[]
}
type LoginResponseType = {
    data: { userId: number }
    resultCode: ResultCodes | ResultCodeForCaptcha
    messages: string[]
}

export const usersAPI = {
    getUsers(currentPage: number= 1, pageSize: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(userID: number) {
        return instance.post(`follow/${userID}`)
    },
    unfollow(userID: number) {
        return instance.delete(`follow/${userID}`)
    },
    getProfile(userID: number) {
        console.warn("please use new method profileApi")
        return profileAPI.getProfile(userID)
    }
}

export const profileAPI = {
    getProfile(userID: number) {
        return instance.get(`profile/${userID}`)
    },
    getStatus(userID: number) {
        return instance.get(`profile/status/${userID}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status})
    },
    //fix savePhoto
    savePhoto(photoFile: Blob) {
        const saveData = new FormData()
        saveData.append("avatar", photoFile)
        return instance.put(`profile/photo`, saveData, {headers:{"Content-type":"multipart/form-data"}})
    },
    saveProfile(profile:ProfileType) {
        return instance.put(`profile`, profile)
    }
}


export const authAPI = {
    me() {
       return instance.get<MeResponseType>(`auth/me`)
           .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha:string|null = null) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha}).then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}
export const securityAPI = {
    getCaptchaUrl() {
       return instance.get(`security/get-captcha-url`)
    }
}



