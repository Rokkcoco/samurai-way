import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {AppRootStateType} from "../../redux/redux-store";
import {NavigateFunction, Params, useLocation, useNavigate, useParams} from "react-router-dom";
import {Location} from 'history';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {ProfileType} from "../../types/types";


type RouterPropsType = {
    router: {
        location: Location;
        navigate: NavigateFunction;
        params: Params<"userID">;
    }
};

type MapStateToPropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserID: number | null
    isAuth: boolean
}

type MapDispatchToPropsType = {
    getUserProfile: (userID: number) => void
    getStatus: (userID: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<void>
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & RouterPropsType

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        console.log(this.props.router)
        let userID = this.props.router.params.userID

        if (!userID) userID = this.props.authorizedUserID?.toString()
        // if (!userID) {
        //     this.props.router.location.pathname ="/login"
        // }
        //вроде все работает, проверить не показывает ли профиль после logout

        if (!userID) {
            console.error("ID should exist in URI params or in state")
        } else {
            this.props.getUserProfile(Number(userID))
            this.props.getStatus(Number(userID))
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }


    componentDidUpdate(prevProps: PropsType) {
        if (prevProps.router.params.userID !== this.props.router.params.userID) this.refreshProfile()

    }

//если у меня в парамсе нет userID, значит я владелец и тогда isOwner true
    render() {

        return (
            <Profile
                {...this.props}
                isOwner={!this.props.router.params.userID}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto}
            />
        );
    }
}


// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
export function withRouter(Component: any) {
    function ComponentWithRouterProp(props: any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp;
}


const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserID: state.auth.userId,
    isAuth: state.auth.isAuth
})


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect)(ProfileContainer)