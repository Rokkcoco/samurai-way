import React, {FC} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {Route, Routes} from "react-router-dom";
import {StateType} from "./redux/state";


type AppType ={
    state: StateType
}

const App:FC<AppType> = ({state}):JSX.Element => (
    <div className='app-wrapper'>
        <Header/>
        <Navbar/>
        <div className="app-wrapper-content">
            <Routes>
                <Route path='/dialogs/*' element={<Dialogs state={state.messagesPage}/>}/>
                <Route path='/profile' element={<Profile state={state.profilePage}/>}/>
                <Route path='/news' element={<News/>}/>
                <Route path='/music' element={<Music/>}/>
                <Route path='/settings' element={<Settings/>}/>
            </Routes>
        </div>
    </div>

);

export default App;
