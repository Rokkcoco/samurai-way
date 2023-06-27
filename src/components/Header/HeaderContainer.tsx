import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setAuthUserData} from "../../redux/authReducer";

type mapDispatchToPropsType = {
    setAuthUserData: (userId: number, email: string, login: string) => void
}
type mapStateToPropsType = {
    isAuth: null | boolean
    login: null | string
}
type HeaderContainerPropsType = mapDispatchToPropsType & mapStateToPropsType


class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {

        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        }).then(response => {
                if (response.data.resultCode === 0) {
                    const {login, id, email} = response.data.data
                    this.props.setAuthUserData(id, email, login)
                }
                console.log(response)

            }
        )
    }

    render() {
        return <Header {...this.props} />
    }
}
const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})



export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)

