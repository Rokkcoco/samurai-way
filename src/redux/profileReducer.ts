import {PostsDataType} from "./store";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = "ADD-POST"
type PostsType = {
    id: number
    message: string
    likesCount: number
}
const initialState = {
        posts: [
            {id: 1, message: "Hi, how are you", likesCount: 12},
            {id: 2, message: "How are you?", likesCount: 23},
            {id: 3, message: "How old are you", likesCount: 2},
            {id: 4, message: "It's my first post", likesCount: 25},
            {id: 5, message: "Yo", likesCount: 9}
        ] as PostsType[],
    profile: null,
    status: ""
    }
    export type InitialStateType = typeof initialState
//Можно сделать блочную видимость как в ADD POST {} чтобы переменная оттуда не пересекалась с другой
const profileReducer = (state:InitialStateType = initialState, action: ProfileReducerActionsType) => {

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
        case "DELETE-POST": {
            return {...state, posts: state.posts.filter(t => t.id !== action.postID)}
        }
        case "SAVE-PHOTO-SUCCESS": {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        default:
            return state
    }
}
type AddPostActionCreatorType = ReturnType<typeof addPostActionCreator>

type SetUserProfileType = ReturnType<typeof setUserProfile>
type SetStatusType = ReturnType<typeof setStatus>
type DeletePostType = ReturnType<typeof deletePost>
type SavePhotoSuccess = ReturnType<typeof savePhotoSuccess>
type ProfileReducerActionsType = AddPostActionCreatorType  | SetUserProfileType | SetStatusType | DeletePostType | SavePhotoSuccess
export const addPostActionCreator = (newPostText:string) => ({type: ADD_POST, newPostText}) as const


export const setUserProfile = (profile: any) => ({type: "SET-USER-PROFILE", profile}) as const
export const setStatus = (status: string) => ({type: "SET-STATUS", status}) as const
export const savePhotoSuccess = (photos:any) => ({type: "SAVE-PHOTO-SUCCESS", photos}) as const

export const getUserProfile = (userID: number) => async (dispatch: Dispatch) => {
    const response = await usersAPI.getProfile(userID)
        dispatch(setUserProfile(response.data))

}

export const getStatus = (userID: number) => async (dispatch: Dispatch) => {
    const response = await profileAPI.getStatus(userID)
        dispatch(setStatus(response.data))
}
//если резалткод 0, т.е. без ошибки
export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }

}
//fix any
export const savePhoto = (file:any) => async (dispatch: Dispatch) => {
    const response = await profileAPI.savePhoto(file)
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }

}

export const deletePost = (postID: number) => ({type: "DELETE-POST", postID} as const)

export default profileReducer