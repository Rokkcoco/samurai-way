import {PostsDataType, ProfilePageType} from "./state";

const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"


const profileReducer = (state: ProfilePageType, action: any) => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostsDataType = {
                id: Date.now(),
                message: state.newPostText,
                likesCount: 0
            }
            state.posts.push(newPost)
            state.newPostText = ''
            break;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText
            break;
    }
    return state
}

export default profileReducer