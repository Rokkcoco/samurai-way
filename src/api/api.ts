import axios from "axios";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials:true,
    headers: {
        "API-KEY": "654ee2dd-0295-4c54-aa15-a75a7c846bf1"
    }
})

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
    }
}


export const authAPI = {
    me() {
       return instance.get(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}



