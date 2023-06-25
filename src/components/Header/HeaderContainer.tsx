import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setAuthUserData} from "../../redux/authReducer";



class  HeaderContainer extends React.Component  {
    componentDidMount() {

        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        }).then(response => {
                console.log(response)

            }
        )
    }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state:AppStateType) => {

}



export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)

