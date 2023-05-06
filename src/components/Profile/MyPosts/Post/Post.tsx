import React, {FC} from 'react';
import s from "./Post.module.css";

type PostTypeProps = {
    message: string
    likeCounts: number
    id:number
}
const Post:FC<PostTypeProps> = ({message, likeCounts, ...props}) => {
    return <div className={s.dialog}>
        <img src="https://dlyarostavolos.com/wp-content/uploads/2018/11/ryzhue-volosy-5.jpg" alt="Pepega"/>
        {message}
        <div>
            <span>Like </span><span>{likeCounts}</span>
        </div>
    </div>


}

export default Post;