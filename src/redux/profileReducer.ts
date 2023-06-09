import {PostsDataType} from "./store";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = "ADD-POST"

const initialState = {
        posts: [
            {id: 1, message: "Hi, how are you", likesCount: 12},
            {id: 2, message: "How are you?", likesCount: 23},
            {id: 3, message: "How old are you", likesCount: 2},
            {id: 4, message: "It's my first post", likesCount: 25},
            {id: 5, message: "Yo", likesCount: 9}
        ],
    profile: null,
    status: ""
    }
//Можно сделать блочную видимость как в ADD POST {} чтобы переменная оттуда не пересекалась с другой
const profileReducer = (state = initialState, action: ProfileReducerActionsType) => {

    switch (action.type) {
        case ADD_POST: {
            const newPost: PostsDataType = {
                id: Date.now(),
                message: action.newPostText,
                likesCount: 0
            }
            return {...state, newPostText: "", posts: [...state.posts, newPost]}
        }
        case "SET-USER-PROFILE":
            return {...state, profile: action.profile }
        case "SET-STATUS":
            return {...state, status: action.status}
        default:
            return state
    }
}
type AddPostActionCreatorType = ReturnType<typeof addPostActionCreator>

type SetUserProfileType = ReturnType<typeof setUserProfile>
type SetStatusType = ReturnType<typeof setStatus>
type ProfileReducerActionsType = AddPostActionCreatorType  | SetUserProfileType | SetStatusType
export const addPostActionCreator = (newPostText:string) => ({type: ADD_POST, newPostText}) as const


export const setUserProfile = (profile: any) => ({type: "SET-USER-PROFILE", profile}) as const
export const setStatus = (status: string) => ({type: "SET-STATUS", status}) as const

export const getUserProfile = (userID: number) => (dispatch: Dispatch) => {
    usersAPI.getProfile(userID).then(response => {
        dispatch(setUserProfile(response.data))
    })
}

export const getStatus = (userID: number) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userID).then(response => {
        dispatch(setStatus(response.data))
    })
}
//если резалткод 0, т.е. без ошибки
export const updateStatus = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    })
}

export default profileReducer