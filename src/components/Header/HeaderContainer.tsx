import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getAuthUserData} from "../../redux/authReducer";


type mapDispatchToPropsType = {
    getAuthUserData: () => void
}
type mapStateToPropsType = {
    isAuth: null | boolean
    login: null | string
}
type HeaderContainerPropsType = mapDispatchToPropsType & mapStateToPropsType


class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return <Header {...this.props} />
    }
}
const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})



export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer)

