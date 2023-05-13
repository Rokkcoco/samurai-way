import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {store, StateType} from "./redux/state";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

export const rerenderEntireTree = (state:StateType) => {
    root.render(
        <BrowserRouter>
            <App state={state} dispatch={store.dispatch.bind(store)}/>
        </BrowserRouter>
    );
}


rerenderEntireTree(store.getState())






store.subscribe(rerenderEntireTree)