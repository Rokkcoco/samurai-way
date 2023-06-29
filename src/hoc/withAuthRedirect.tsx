import React from 'react';
import { Navigate } from "react-router-dom";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";

const mapStateToPropsForRedirect = (state: AppStateType) => ({
        isAuth: state.auth.isAuth
})

export const withAuthRedirect = (Component: any) => {
        class RedirectComponent extends React.Component {
                render() {
                        if (!this.props.isAuth) return <Navigate to='/login'/>
                        return <Component {...this.props}/>
                }
        }
        const ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
        return ConnectedAuthRedirectComponent
}