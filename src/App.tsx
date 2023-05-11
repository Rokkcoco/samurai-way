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
import {StateType, updateNewPostText} from "./redux/state";


type AppType ={
    state: StateType
    addPost: ()=>void
    updateNewPostText: (newText:string)=>void
}

const App:FC<AppType> = ({state, addPost, updateNewPostText}):JSX.Element => (
    <div className='app-wrapper'>
        <Header/>
        <Navbar/>
        <div className="app-wrapper-content">
            <Routes>
                <Route path='/dialogs/*' element={<Dialogs messagesPage={state.messagesPage}/>}/>
                <Route path='/profile' element={<Profile profilePage={state.profilePage} newPostTextData={state.profilePage.newPostTextData} addPost={addPost} updateNewPostText={updateNewPostText}/>}/>
                <Route path='/news' element={<News/>}/>
                <Route path='/music' element={<Music/>}/>
                <Route path='/settings' element={<Settings/>}/>
            </Routes>
        </div>
    </div>

);

export default App;
