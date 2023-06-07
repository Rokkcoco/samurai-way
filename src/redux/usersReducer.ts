import {PostsDataType} from "./store";

const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"

const initialState = {
        posts: [
            {id: 1,followed: true, fullName: "Dmitry", status: "I'm a boss", location: {city: "Minsk", country: "Belarus"}},
            {id: 2,followed: false, fullName: "Sasha", status: "I'm a boss too", location: {city: "Moscow", country: "Russia"}},
            {id: 3,followed: true, fullName: "Valera", status: "No, I'm a boss", location: {city: "Kiev", country: "Ukraine"}},
            {id: 4,followed: false, fullName: "Andrew", status: "Nope, I'm a boss", location: {city: "London", country: "UK"}},
        ],
        newPostText: "it-kamasutra.com"
    }
//Можно сделать блочную видимость как в ADD POST {} чтобы переменная оттуда не пересекалась с другой
const usersReducer = (state = initialState, action: any) => {
    switch (action.type) {
        default:
            return state
    }
}

export const addPostActionCreator = () => ({type: ADD_POST})
export const updateNewPostTextActionCreator = (text: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text})

export default usersReducer