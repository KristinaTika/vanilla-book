import { postService } from "./services/postService.js";
import { userService } from "./services/userService.js";
import { commentService } from "./services/commentService.js";
import { loginService } from "./services/loginService.js";

export const getPosts = () => {
    return postService.fetchPosts();
}

export const getSinglePost = (type, id) => {
    return postService.fetchSinglePost(type, id);
}

export const createNewPost = (type, newContent) => {
    return postService.postNewPost(type, newContent);
}

export const deletePost = (id) => {
    return postService.deletePost(id);
}

export const getComments = (id) => {
    return commentService.fetchComments(id);
}

export const postNewComment = (commentData) => {
    return commentService.postNewComment(commentData);
}

export const getUsers = () => {
    return userService.fetchUsers();
}

export const getSingleUser = (id) => {
    return userService.fetchSingleUser(id)
}

export const getProfile = () => {
    return userService.fetchProfile();
}

export const updateProfile = (data) => {
    return userService.updateProfile(data);
}

export const deleteOldPosts = () => {
    return postService.deleteOldPosts();
}

export const loginUser = (data) => {
    return loginService.loginUser(data);
}

export const registerUser = (data) => {
    return loginService.registerUser(data);
}

export const AddLikes = (post) => {
    post.likesNum ++;
}