import profileReducer, {addPostActionCreator, deletePost, InitialStateType} from "./profileReducer";

let state:InitialStateType

beforeEach(() => {
    state = {
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
})
it("length of posts should be incremented", () => {

    const action = addPostActionCreator("hey-ho")
    const newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(6)

})

it("message of new post should be correct", () => {

    const action = addPostActionCreator("hey-ho")
    const newState = profileReducer(state, action)
    expect(newState.posts[5].message).toBe("hey-ho")

})

it("after deleting length of messages should be decrement", () => {

    const action = deletePost(4)
    const newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(4)
    expect(newState.posts[3].id).toBe(5)

})
it("after deleting length shouldn't be decrement if ID is not correct", () => {

    const action = deletePost(1000)
    const newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(5)
    expect(newState.posts[4].id).toBe(5)

})