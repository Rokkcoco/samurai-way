import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profileReducer";
import {AppStateType} from "../../redux/redux-store";
import {NavigateFunction, Params, useLocation, useNavigate, useParams} from "react-router-dom";
import {Location} from 'history';
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
    status: string

}

type MapDispatchToPropsType = {
    getUserProfile: (userID: number) => void
    getStatus: (userID: number) => void
    updateStatus: (status:string) => void
}

type ProfileContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & RouterPropsType

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
    componentDidMount() {
        console.log(this.props.router)
        let userID = this.props.router.params.userID

        if (!userID) {
            userID = "2"
        }
        this.props.getUserProfile(Number(userID))

        this.props.getStatus(Number(userID))
    }

    render() {

        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
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
    status: state.profilePage.status
})



export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
    withAuthRedirect)(ProfileContainer)