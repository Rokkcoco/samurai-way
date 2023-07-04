import React, {ComponentType} from 'react';
import { Navigate } from "react-router-dom";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";
type MapStateToType = {
        isAuth: boolean
}
const mapStateToProps = (state: AppStateType): MapStateToType => ({
        isAuth: state.auth.isAuth
})

export const withAuthRedirect= <T,>(Component: ComponentType<T>) => {
        const RedirectComponent =(props:MapStateToType) =>{
                const {isAuth, ...restProps} = props


                        if (!isAuth) return <Navigate to='/login'/>
                        return <Component {...restProps as T & {}}/>

        }
        const ConnectedAuthRedirectComponent = connect(mapStateToProps)(RedirectComponent)
        return ConnectedAuthRedirectComponent
}