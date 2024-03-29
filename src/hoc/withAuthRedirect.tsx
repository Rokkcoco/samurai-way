import React, {ComponentType} from 'react';
import { Navigate } from "react-router-dom";
import {AppRootStateType} from "../redux/redux-store";
import {connect} from "react-redux";
type MapStateToType = {
        isAuth: boolean
}
const mapStateToProps = (state: AppRootStateType): MapStateToType => ({
        isAuth: state.auth.isAuth
})

export const withAuthRedirect= <T,>(Component: ComponentType<T>) => {
        const RedirectComponent =(props:MapStateToType) =>{
                const {isAuth, ...restProps} = props


                        if (!isAuth) return <Navigate to={'/login'}/>
                        return <Component {...restProps as T & {}}/>

        }
        return connect(mapStateToProps)(RedirectComponent)
}