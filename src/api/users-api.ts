import {BaseResponseType, GetItemsType, instance} from "./api";


export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10, term:string = "", friend: null|boolean = null) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? "" : `&friend=${friend}`))
            .then(response => response.data)
    },
    follow(userID: number) {
        return instance.post<BaseResponseType>(`follow/${userID}`).then(res => res.data)
    },
    unfollow(userID: number) {
        return instance.delete(`follow/${userID}`).then(res => res.data) as Promise<BaseResponseType>
    }
}