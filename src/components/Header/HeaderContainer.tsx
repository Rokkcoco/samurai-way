import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {logout} from "../../redux/authReducer";


type MapDispatchToPropsType = {
    logout: ()=>void
}
type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
}
type HeaderContainerPropsType = MapDispatchToPropsType & MapStateToPropsType


class HeaderContainer extends React.Component<HeaderContainerPropsType> {


    render() {
        return <Header {...this.props} />
    }
}
const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})



export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, {logout})(HeaderContainer)

