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
    }
}



