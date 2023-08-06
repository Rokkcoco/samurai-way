import {AppThunk} from "./redux-store";
import {getAuthUserData} from "./authReducer";


type InitialStateType = {
    initialized: boolean
}

const initialState = {
    initialized: false
}

const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case "INITIALIZED-SUCCESS":
            return {...state, initialized: true}
        default:
            return state
    }
}

export const initializedSuccess = () => ({type: "INITIALIZED-SUCCESS"}as const)

export const initializeApp = ():AppThunk => (dispatch) => {
    const promise = dispatch(getAuthUserData())
    console.log("promise --->>>>", promise)
    Promise.all([promise]).then(() => dispatch(initializedSuccess()))
}

type AppReducerActionsType = initializedSuccessActionType
type initializedSuccessActionType = ReturnType<typeof initializedSuccess>

export default appReducer