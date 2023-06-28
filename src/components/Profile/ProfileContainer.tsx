import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profileReducer";
import {AppStateType} from "../../redux/redux-store";
import {useLocation, useParams, useNavigate, NavigateFunction, Params, Navigate} from "react-router-dom";
import { Location } from 'history';


type RouterPropsType = {
   router: {
       location: Location;
       navigate: NavigateFunction;
       params: Params;
   }
};

type MapStateToPropsType = {
    profile: any
    isAuth: boolean
}

type MapDispatchToPropsType = {
    getUserProfile: (userID: string) => void
}

type ProfileContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & RouterPropsType

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
    componentDidMount() {
        console.log(this.props.router)
        let userID = this.props.router.params.userID

        if (!userID) {
            userID = "2"
        }
        this.props.getUserProfile(userID)

    }

    render() {
        if (!this.props.isAuth) return <Navigate to="/login"/>
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        );
    }
}




// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
function withRouter(Component: any) {
    function ComponentWithRouterProp(props: any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params= useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})


export default connect(mapStateToProps, {getUserProfile})(withRouter(ProfileContainer));