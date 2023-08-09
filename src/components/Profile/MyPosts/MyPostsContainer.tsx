import {actions} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppRootStateType} from "../../../redux/redux-store";
import {PostType} from "../../../types/types";

type MapPropsToStateType = {
    posts: PostType[]
}

type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
}

const mapStateToProps = (state: AppRootStateType): MapPropsToStateType => {
    return {
        posts: state.profilePage.posts
    }
}


const MyPostsContainer = connect<MapPropsToStateType, MapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, {addPost: actions.addPost})(MyPosts)
export default MyPostsContainer;