import * as feedPageFeedList from "./feedPage/FeedList.js";
import * as feedPageSinglePost from "./feedPage/SinglePost.js";
import * as loginPage from "./loginPage/loginPage.js";
import { createHeader } from "./partials/Header.js";
import { createFooter } from "./partials/Footer.js";
import * as peoplePage from "./peoplePage/UsersList.js";
import * as profilePage from "./profilePage/MyProfile.js";

export const deleteHandler = (event) => {
    return feedPageFeedList.deleteHandler(event);
}

export const newPostHandler = (event) => {
    return feedPageFeedList.newPostHandler(event);
}

export const createFeedList = (posts) => {
    return feedPageFeedList.createFeedList(posts);
}

export const filterTextPost = () => {
    return feedPageFeedList.filterTextPost();
}

export const filterVideoPost = () => {
    return feedPageFeedList.filterVideoPost();
}

export const filterImagePost = () => {
    return feedPageFeedList.filterImagePost();
}

export const filterPostsHandler = (event) => {
    return feedPageFeedList.filterPostsHandler(event);
}

export const createSinglePost = (post,comments ) => {
    return feedPageSinglePost.createSinglePost(post,comments);
}

export const clearSearchInput = () => {
    return feedPageSinglePost.clearSearchInput();
}

export const handlerComments = (event) => {
    return feedPageSinglePost.handlerComments(event);
}

export const createLoginHeader = () => {
    return loginPage.createLoginHeader();
}

export const createLoginPage = () => {
    return loginPage.loginPage();
}

export const loginHandler = (event) => {
    return loginPage.loginHandler(event);
}

export const registerHandler = (event) => {
    return loginPage.registerHandler(event);
}

export const displayHeader = () => {
    return createHeader();
}

export const displayFooter = () => {
    return createFooter();
}

export const createUsersList = (users) => {
    return peoplePage.createUsersList(users);
}

export const goToUserProfile = (user) => {
    return peoplePage.goToUserProfile(user);
}

export const createMyProfilePage = (user) => {
    return profilePage.createMyProfilePage(user);
}

export const updateProfileHandler = (event) => {
    return profilePage.updProfileHandler(event);
}