import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {logout} from "../../redux/authReducer";


type mapDispatchToPropsType = {
    logout: ()=>void
}
type mapStateToPropsType = {
    isAuth: boolean
    login: string | null
}
type HeaderContainerPropsType = mapDispatchToPropsType & mapStateToPropsType


class HeaderContainer extends React.Component<HeaderContainerPropsType> {


    render() {
        return <Header {...this.props} />
    }
}
const mapStateToProps = (state: AppRootStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})



export default connect(mapStateToProps, {logout})(HeaderContainer)

