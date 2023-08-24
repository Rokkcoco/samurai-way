import {InferActionsType} from "./redux-store";


const initialState = {}

const sidebarReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    return state
}

export default sidebarReducer
const actions = {}
type ActionsType = InferActionsType<typeof actions>
type InitialStateType = typeof initialState