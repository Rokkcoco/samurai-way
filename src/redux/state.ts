import {rerenderEntireTree} from "../render";

export type PostsDataType = {
    id: number
    message: string
    likesCount: number
}

export type DialogsDataType = {
    id: number
    name: string
}

export type MessagesDataType = {
    id: number
    message: string
}

export type ProfilePageType = {
    postsData: PostsDataType[]
    newPostTextData: string
}

export type MessagesPageType = {
    messagesData: MessagesDataType[]
    dialogsData: DialogsDataType[]
}

export type StateType = {
    profilePage: ProfilePageType
    messagesPage: MessagesPageType
}

export const state: StateType = {
    profilePage: {
        postsData: [
            {id: 1, message: "Hi, how are you", likesCount: 12},
            {id: 2, message: "How are you?", likesCount: 23},
            {id: 3, message: "How old are you", likesCount: 2},
            {id: 4, message: "It's my first post", likesCount: 25},
            {id: 5, message: "Yo", likesCount: 9}
        ],
        newPostTextData: "it-kamasutra.com"

    },
    messagesPage: {
        dialogsData: [
            {id: 1, name: "Dimych"},
            {id: 2, name: "Andrew"},
            {id: 3, name: "Sveta"},
            {id: 4, name: "Sasha"},
            {id: 5, name: "Viktor"},
            {id: 6, name: "Valera"}
        ],
        messagesData: [
            {id: 1, message: "Hi"},
            {id: 2, message: "How are you?"},
            {id: 3, message: "Yo"},
            {id: 4, message: "Yo"},
            {id: 5, message: "Yo"}
        ]
    }
}

export const addPost = () => {
    const newPost: PostsDataType = {id: Date.now(), message: state.profilePage.newPostTextData, likesCount: 0}
    state.profilePage.postsData.push(newPost)
    state.profilePage.newPostTextData =''
    rerenderEntireTree(state)
}

export const updateNewPostText = (newText:string) => {
    state.profilePage.newPostTextData = newText
    rerenderEntireTree(state)
}