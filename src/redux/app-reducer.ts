import {AppThunk} from "./redux-store";
import {getAuthUserData} from "./authReducer";


type InitialStateType = {
    initialized: boolean
}

const initialState = {
    initialized: false
}

const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "samurai-way/app/INITIALIZED-SUCCESS":
            return {...state, initialized: true}
        default:
            return state
    }
}

export const initializedSuccess = () => ({type: "samurai-way/app/INITIALIZED-SUCCESS"} as const)

export const initializeApp = ():AppThunk => (dispatch) => {
    const promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => dispatch(initializedSuccess()))
}

type ActionsType = initializedSuccessActionType
type initializedSuccessActionType = ReturnType<typeof initializedSuccess>

export default appReducer