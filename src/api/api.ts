import axios from "axios";
import {UserType} from "../types/types";


export const instance = axios.create({
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

export type GetItemsType = {
    items: UserType[]
    totalCount: number
    error: string | null
}

export type BaseResponseType<D = {}, RS = ResultCodes> = {
    data: D
    messages: string[]
    resultCode: RS
}