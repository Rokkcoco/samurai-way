import React, {FC} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {Route, Routes} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";


type AppType ={
    store: any
    dispatch:(action:any)=>any
}

const App:FC<AppType> = ({store}):JSX.Element => (
    <div className='app-wrapper'>
        <Header/>
        <Navbar/>
        <div className="app-wrapper-content">
            <Routes>
                <Route path='/dialogs/*' element={<DialogsContainer store={store}/>}/>
                <Route path='/profile' element={<Profile store={store}/>}/>
                <Route path='/news' element={<News/>}/>
                <Route path='/music' element={<Music/>}/>
                <Route path='/settings' element={<Settings/>}/>
            </Routes>
        </div>
    </div>

);

export default App;
