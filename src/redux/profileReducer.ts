import {PostsDataType} from "./store";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";
import {AppRootStateType, AppThunk} from "./redux-store";
import {PhotosType, PostType, ProfileType} from "../types/types";


const initialState = {
        posts: [
            {id: 1, message: "Hi, how are you", likesCount: 12},
            {id: 2, message: "How are you?", likesCount: 23},
            {id: 3, message: "How old are you", likesCount: 2},
            {id: 4, message: "It's my first post", likesCount: 25},
            {id: 5, message: "Yo", likesCount: 9}
        ] as PostType[],
    profile: null as null | ProfileType,
    status: ""
}

export type InitialStateType = typeof initialState
//Можно сделать блочную видимость как в ADD POST {} чтобы переменная оттуда не пересекалась с другой
const profileReducer = (state:InitialStateType = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case "samurai-way/profilePage/ADD-POST":
            const newPost: PostsDataType = {
                id: Date.now(),
                message: action.newPostText,
                likesCount: 0
            }
            return {...state, posts: [...state.posts, newPost]}
        case "samurai-way/profilePage/SET-USER-PROFILE":
            return {...state, profile: action.profile }
        case "samurai-way/profilePage/SET-STATUS":
            return {...state, status: action.status}
        case "samurai-way/profilePage/DELETE-POST":
            return {...state, posts: state.posts.filter(t => t.id !== action.postID)}
        case "samurai-way/profilePage/SAVE-PHOTO-SUCCESS":
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}

        default:
            return state
    }
}
type AddPostActionCreatorType = ReturnType<typeof addPostActionCreator>

type SetUserProfileType = ReturnType<typeof setUserProfile>
type SetStatusType = ReturnType<typeof setStatus>
type DeletePostType = ReturnType<typeof deletePost>
type SavePhotoSuccessType = ReturnType<typeof savePhotoSuccess>

type ActionsType = AddPostActionCreatorType  | SetUserProfileType | SetStatusType | DeletePostType | SavePhotoSuccessType
export const addPostActionCreator = (newPostText:string) => ({type: "samurai-way/profilePage/ADD-POST", newPostText}) as const

export const deletePost = (postID: number) => ({type: "samurai-way/profilePage/DELETE-POST", postID} as const)
export const setUserProfile = (profile: ProfileType) => ({type: "samurai-way/profilePage/SET-USER-PROFILE", profile}) as const
export const setStatus = (status: string) => ({type: "samurai-way/profilePage/SET-STATUS", status}) as const
export const savePhotoSuccess = (photos:PhotosType) => ({type: "samurai-way/profilePage/SAVE-PHOTO-SUCCESS", photos}) as const

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
        if (response.data.resultCode === 0) dispatch(setStatus(status))
}

//fix any
export const savePhoto = (file:any) => async (dispatch: Dispatch) => {
    const response = await profileAPI.savePhoto(file)
        if (response.data.resultCode === 0) dispatch(savePhotoSuccess(response.data.data.photos))
}

export const saveProfile = (profile:ProfileType):AppThunk => async (dispatch, getState: ()=>AppRootStateType) => {
    const userID = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
        if (response.data.resultCode === 0) {
           await dispatch(getUserProfile(userID as number))
        } else {
            console.log(response.data.messages[0])
            return Promise.reject(response.data.messages[0])
        }

}



export default profileReducer