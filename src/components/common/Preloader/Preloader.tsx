import React from 'react';
import spinner from "../../../assets/images/Spin-1s-200px.svg";

export const Preloader = () => {
    return (
        <div style={{backgroundColor:"white"}}>
            <img src={spinner}/>
        </div>
    );
};

