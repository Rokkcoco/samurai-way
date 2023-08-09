import {AppThunkType, InferActionsType} from "./redux-store";
import {getAuthUserData} from "./authReducer";


const initialState = {
    initialized: false
}
 
const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "app/INITIALIZED-SUCCESS":
            return {...state, initialized: true}
        default:
            return state
    }
}

export const actions = {
    initializedSuccess:() => ({type: "app/INITIALIZED-SUCCESS"} as const)
}

export const initializeApp = ():ThunkType => (dispatch) => {
    const promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => dispatch(actions.initializedSuccess()))
}

export default appReducer
type InitialStateType = typeof initialState
type ThunkType = AppThunkType<ActionsType, void>
type ActionsType = InferActionsType<typeof actions>