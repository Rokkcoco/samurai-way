import React, {Suspense} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {UsersPage} from "./components/Users/UsersContainer";
import {withRouter} from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";

import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import store, {AppRootStateType} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";
import {LoginPage} from "./components/Login/LoginPage";


const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))

type MapDispatchToPropsType = {
    initializeApp: () => void
}
type MapStateToPropsType = {
    initialized: boolean
}
type PropsType = MapDispatchToPropsType & MapStateToPropsType

class App extends React.Component<PropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert("Some error occured")
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render(): JSX.Element {
        if (!this.props.initialized) return <Preloader/>
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Suspense fallback={<div><Preloader/></div>}>
                        <Routes>
                            <Route path='dialogs/*' element={<DialogsContainer/>}/>
                            <Route path='profile/:userID' element={<ProfileContainer/>}/>
                            <Route path='profile' element={<ProfileContainer/>}/>
                            <Route path='users' element={<UsersPage/>}/>
                            <Route path='news' element={<News/>}/>
                            <Route path='music' element={<Music/>}/>
                            <Route path='settings' element={<Settings/>}/>
                            <Route path='login' element={<LoginPage/>}/>
                            <Route path='/' element={<Navigate to="profile"/>}/>
                            <Route path='*' element={<div>404 NOT FOUND</div>}/>
                        </Routes>
                    </Suspense>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state: AppRootStateType) => ({
    initialized: state.app.initialized
})

const AppContainer = compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, {initializeApp}),
    withRouter)(App);
const SamuraiJSApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}
export default SamuraiJSApp