import {PostsDataType} from "./store";
import {setUsers} from "./usersReducer";

const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"

const initialState = {
        posts: [
            {id: 1, message: "Hi, how are you", likesCount: 12},
            {id: 2, message: "How are you?", likesCount: 23},
            {id: 3, message: "How old are you", likesCount: 2},
            {id: 4, message: "It's my first post", likesCount: 25},
            {id: 5, message: "Yo", likesCount: 9}
        ],
        newPostText: "it-kamasutra.com",
    profile: null
    }
//Можно сделать блочную видимость как в ADD POST {} чтобы переменная оттуда не пересекалась с другой
const profileReducer = (state = initialState, action: ProfileReducerActionsType) => {
    switch (action.type) {
        case ADD_POST: {
            const newPost: PostsDataType = {
                id: Date.now(),
                message: state.newPostText,
                likesCount: 0
            }
            return {...state, newPostText: "", posts: [...state.posts, newPost]}
        }
        case UPDATE_NEW_POST_TEXT:
            return {...state, newPostText: action.newText}
        case "SET-USER-PROFILE":
            return {...state, profile: action.profile }
        default:
            return state
    }
}
type AddPostActionCreatorType = ReturnType<typeof addPostActionCreator>
type UpdateNewPostTextActionCreatorType = ReturnType<typeof updateNewPostTextActionCreator>
type SetUserProfileType = ReturnType<typeof setUserProfile>
type ProfileReducerActionsType = AddPostActionCreatorType | UpdateNewPostTextActionCreatorType | SetUserProfileType
export const addPostActionCreator = () => ({type: ADD_POST}) as const
export const updateNewPostTextActionCreator = (text: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text}) as const

export const setUserProfile = (profile: any) => ({type: "SET-USER-PROFILE", profile}) as const

export default profileReducer