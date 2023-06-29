import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profileReducer";
import {AppStateType} from "../../redux/redux-store";
import {useLocation, useParams, useNavigate, NavigateFunction, Params} from "react-router-dom";
import { Location } from 'history';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


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



export default compose(
    connect(mapStateToProps, {getUserProfile}),
    withRouter,
    withAuthRedirect)(ProfileContainer)