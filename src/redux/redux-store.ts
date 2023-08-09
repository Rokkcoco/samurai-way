import {Action, applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunk, {ThunkAction} from "redux-thunk";
import appReducer from "./app-reducer";


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
    app: appReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = legacy_createStore(rootReducer,composeEnhancers(applyMiddleware(thunk )))
export type AppThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppRootStateType, unknown, A>


export type InferActionsType<T> = T extends {[key:string]: (...args:any[]) => infer U } ? U : never
 
//@ts-ignore
window.store = store
export default store