import {PostsDataType} from "./store";
import {Dispatch} from "redux";
import {AppRootStateType, AppThunkType, InferActionsType} from "./redux-store";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profile-api";
import {ResultCodes} from "../api/api";

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

//Можно сделать блочную видимость как в ADD POST {} чтобы переменная оттуда не пересекалась с другой
const profileReducer = (state:InitialStateType = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case "profilePage/ADD-POST":
            const newPost: PostsDataType = {
                id: Date.now(),
                message: action.newPostText,
                likesCount: 0
            }
            return {...state, posts: [...state.posts, newPost]}
        case "profilePage/SET-USER-PROFILE":
            return {...state, profile: action.profile }
        case "profilePage/SET-STATUS":
            return {...state, status: action.status}
        case "profilePage/DELETE-POST":
            return {...state, posts: state.posts.filter(t => t.id !== action.postID)}
        case "profilePage/SAVE-PHOTO-SUCCESS":
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}

        default:
            return state
    }
}

export const actions = {
    addPost:(newPostText:string) => ({type: "profilePage/ADD-POST", newPostText}as const),
    deletePost: (postID: number) => ({type: "profilePage/DELETE-POST", postID} as const),
    setUserProfile: (profile: ProfileType) => ({type: "profilePage/SET-USER-PROFILE", profile}as const),
    setStatus: (status: string) => ({type: "profilePage/SET-STATUS", status}as const),
    savePhotoSuccess: (photos:PhotosType) => ({type: "profilePage/SAVE-PHOTO-SUCCESS", photos}as const)
}

export const getUserProfile = (userID: number) => async (dispatch: Dispatch) => {
    const data = await profileAPI.getProfile(userID)
        dispatch(actions.setUserProfile(data))
}

export const getStatus = (userID: number) => async (dispatch: Dispatch) => {
    const data = await profileAPI.getStatus(userID)
        dispatch(actions.setStatus(data))
}

//если резалткод 0, т.е. без ошибки
export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === ResultCodes.Success) dispatch(actions.setStatus(status))
}

//fix any
export const savePhoto = (file:File) => async (dispatch: Dispatch) => {
    const data = await profileAPI.savePhoto(file)
        if (data.resultCode === ResultCodes.Success) dispatch(actions.savePhotoSuccess(data.data.photos))
}

export const saveProfile = (profile:ProfileType):ThunkType => async (dispatch, getState: ()=>AppRootStateType) => {
    const userID = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)
        if (data.resultCode === ResultCodes.Success) {
            if (userID !== null) {
                await dispatch(getUserProfile(userID))
            } else {
                throw new Error("userID cant be null")
            }
        } else {
            console.log(data.messages[0])
            return Promise.reject(data.messages)
        }
}



export default profileReducer
export type InitialStateType = typeof initialState
type ThunkType = AppThunkType<ActionsType>
type ActionsType = InferActionsType<typeof actions>