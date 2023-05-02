import React from 'react';
import s from "./Post.module.css";

type PostTypeProps = {
    message: string
    likeCounts: number
}
const Post = (props:PostTypeProps) => {
    return <div className={s.dialog}>
        <img src="https://dlyarostavolos.com/wp-content/uploads/2018/11/ryzhue-volosy-5.jpg" alt="Pepega"/>
        {props.message}
        <div>
            <span>Like</span><span>{props.likeCounts}</span>
        </div>
    </div>


}

export default Post;