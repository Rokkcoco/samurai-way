import {Action, applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import appReducer from "./app-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import chatReducer from "./chat-reducer";


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    chat:chatReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = legacy_createStore(rootReducer,composeEnhancers(applyMiddleware(thunk )))
export type AppThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppRootStateType, unknown, A>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, Action>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


export type InferActionsType<T> = T extends {[key:string]: (...args:any[]) => infer U } ? U : never
 
//@ts-ignore
window.store = store
export default store