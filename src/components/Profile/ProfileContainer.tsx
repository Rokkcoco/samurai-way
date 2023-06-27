import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profileReducer";
import {AppStateType} from "../../redux/redux-store";
import {useLocation, useParams, useNavigate, NavigateFunction, Params} from "react-router-dom";
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
}

type MapDispatchToPropsType = {
    setUserProfile: (profile: any) => void
}

type ProfileContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & RouterPropsType

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
    componentDidMount() {
        let userId = this.props.router.params.userId
        if (!userId) {
            userId = String(2)
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(response => {
                console.log(response)
                this.props.setUserProfile(response.data)
            }
        )
    }

    render() {
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
    profile: state.profilePage.profile
})


export default connect(mapStateToProps, {setUserProfile})(withRouter(ProfileContainer));