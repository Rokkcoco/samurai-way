import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";

export type PostsType = {
    id: number
    message: string
    likesCount: number
}
let posts = [
    {id: 1, message: "Hi, how are you", likesCount: 12},
    {id: 2, message: "How are you?", likesCount: 23},
    {id: 3, message: "How old are you", likesCount: 2},
    {id: 4, message: "It's my first post", likesCount: 25},
    {id: 5, message: "Yo", likesCount: 9}
]
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
    <App posts={posts}/>
    </BrowserRouter>
);
