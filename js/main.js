import * as data from "./data/data.js";
import * as ui from "./ui/ui.js";

const myUsers = [];
const myPosts = [];

const filterMyPosts = (posts, postId) => {
    let filteredPost = posts.filter((post) => {
        return post.id == postId;
    });

    return filteredPost[0];
}

const initLoginPage = () => {

    ui.createLoginHeader();
    ui.createLoginPage();
    setTimeout(initLoginForm, 1000);
}

const initLoginForm = () => {

    const enterLoginButton = document.querySelector("#login-password");
    enterLoginButton.addEventListener("keyup", enterLoginHandler);

    const loginButton = document.querySelector(".login-button");
    loginButton.addEventListener("click", loginHandler);


    const registerButton = document.querySelector(".register-button");
    registerButton.addEventListener("click", registerHandler);

    const enterRegisterButton = document.querySelector("#register-password");
    enterRegisterButton.addEventListener("keyup", enterRegisterHandler);
}

const enterRegisterHandler = (event) => {

    if (event.keyCode === 13) {
        registerHandler(event);
    }
}

const registerHandler = (event) => {

    const registerData = ui.registerHandler(event);

    data.registerUser(registerData)
        .then((response) => {
            return response.json();
        })
        .then(response => {
            if (response.error) {
                alert(response.error.message);
            } else {
                const header = document.querySelector("#welcome-header");
                if (header === null) {
                    ui.createLoginHeader();
                    initAfterRegister();
                } else {
                    initAfterRegister();
                }
            }
        })
}

const initAfterRegister = () => {
    ui.loginPage();
    setTimeout(initLoginForm, 1000);
}

const enterLoginHandler = (event) => {

    if (event.keyCode === 13) {
        loginHandler(event);
    }
}

const loginHandler = (event) => {

    const loginData = ui.loginHandler(event);

    data.loginUser(loginData)
        .then((response) => {
            return response.json()
            log.createLoginHeader();
        })
        .then(response => {
            if (response.error) {
                alert(response.error.message);
            }
            else if (!response.error) {
                localStorage.setItem('sessionId', response.sessionId);
                initPage();
            }
        })
}

const initPage = () => {

    data.getProfile()
        .then((profile) => {
            localStorage.setItem("user-profile", JSON.stringify(profile));
        })

    ui.displayHeader();
    createFeedPage();
    initUsersPage();
    initFeedPage();
    setTimeout(initSinglePostPage, 1000);
    initProfilePage();
}

const createFeedPage = () => {

    data.getPosts()
        .then((posts) => {
            ui.createFeedList(posts);
            addLikeListener();
            posts.forEach((post) => {
                myPosts.push(post);
            })
            localStorage.setItem("posts", JSON.stringify(posts));
            initDeleteOption();
        });
    setTimeout(initSinglePostPage, 1000);
    setTimeout(initFilterMenu, 1000);
    setTimeout(initHandlerNewPost, 1000);

    const logouts = document.querySelectorAll(".logout");
    logouts.forEach((logout) => {
        logout.addEventListener("click", logoutHandler);
    })
}

const likesHandler = (event) => {
    console.log(event);

    const clickedPost = event.target.getAttribute("post-id");
    const parentId = event.target.parentElement.getAttribute("post-id");

    let result = filterMyPosts(myPosts, clickedPost);
    clickedPost == parentId ? data.AddLikes(result) : "";

    infiniteAddLikes();
}

const infiniteAddLikes = () => {
    ui.createFeedList(myPosts);
    // createFeedPage();
    addLikeListener();
    initSinglePostPage();
    initHandlerNewPost();
}

const addLikeListener = () => {
    const likes = document.querySelectorAll(".like-button");
    likes.forEach((like) => {
        like.addEventListener("click", likesHandler);
    })
}

const logoutHandler = (event) => {

    const header = document.querySelector(".header");
    header.style.display = "none";

    const search = document.querySelector(".search-users");
    if (search) {
        search.style.display = "none";
    }

    initLoginPage();
}

const initHandlerNewPost = () => {

    const postButton = document.querySelector("#create-new-post");
    postButton.addEventListener("click", handlerNewPost);
}

const handlerNewPost = (event) => {

    const dataToPost = ui.newPostHandler(event);

    data.createNewPost(dataToPost.type, dataToPost)
        .then((response) => {
            bla();
        });
}

const bla = () => {
    createFeedPage();
    initUsersPage();
    initFeedPage();
    setTimeout(initSinglePostPage, 1000);
    initProfilePage();
}

const deleteHandler = (event) => {

    const postId = ui.deleteHandler(event);

    data.deletePost(postId)
        .then((response) => {
            bla();
        });
}

const initDeleteOption = () => {

    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener("click", deleteHandler);
    })
}

const initFilterMenu = () => {

    const allPosts = document.querySelectorAll(".filter-posts");
    allPosts.forEach((post) => {
        post.addEventListener("change", filPostsHandler);
    })
}

const filPostsHandler = (event) => {

    ui.filterPostsHandler(event);
    initSinglePostPage();
    initDeleteOption();
}

const initFeedPage = (event) => {

    const feedPage = document.querySelectorAll(".feed-page");
    feedPage.forEach((feed) => {
        feed.addEventListener("click", feedPageHandler);
    });
}

const feedPageHandler = (event) => {

    const inputField = document.querySelector(".search-users");
    if (inputField) {
        inputField.setAttribute("class", "hide");
    }
    createFeedPage();
}

const displayUsersList = (users) => {

    ui.createUsersList(users);
    const search = document.querySelector(".search-users");
    search.addEventListener("keyup", filterUsers);
    initGoToUserProfilePage();
}

const goToUserProfileHandler = (event) => {

    const inputField = document.querySelector(".search-users");
    if (inputField) {
        inputField.setAttribute("class", "hide");
    }

    event.preventDefault();
    const userId = event.target.getAttribute("user-id");

    data.getSingleUser(userId)
        .then((user) => {
            ui.goToUserProfile(user);
        });
}

const initGoToUserProfilePage = () => {

    setTimeout(() => {
        const profiles = document.querySelectorAll(".user-name");
        profiles.forEach((profile) => {
            profile.addEventListener("click", goToUserProfileHandler);
        })
    }, 1000)
}

const filterUsers = (event) => {

    initGoToUserProfilePage();
    const myUsers = JSON.parse(localStorage.getItem("users"));

    let filterUsers = myUsers.filter((user) => {
        let userName = user.name.toLowerCase();
        return userName.includes(event.target.value);
    });

    ui.createUsersList(filterUsers);
}

const createUserPage = (event) => {

    data.getUsers()
        .then((users) => {
            displayUsersList(users);
            users.forEach((user) => {
                myUsers.push(user);
                localStorage.setItem("users", JSON.stringify(users));
            });
        })
}

const initUsersPage = () => {

    const peoplePage = document.querySelectorAll(".people-page");
    peoplePage.forEach((user) => {
        user.addEventListener("click", createUserPage);
    });
}

const singlePostHandler = (event) => {

    event.preventDefault();
    const postId = event.target.getAttribute("post-id");
    const type = event.target.getAttribute("post-type");

    data.getSinglePost(type, postId)
        .then((post) => {
            localStorage.setItem("post", JSON.stringify(post));
            getCommentsHandler(post);
        });
}

const getCommentsHandler = (post) => {

    data.getComments(post.id)
        .then((comments) => {
            if (comments.length == 0) {
                const comments1 = []
                ui.createSinglePost(post, comments1);
                addNewCommentListener();
            } else {
                comments.forEach((comment) => {
                    data.getSingleUser(comment.authorId)
                        .then((user) => {
                            localStorage.setItem("user", JSON.stringify(user));
                            ui.createSinglePost(post, comments);
                            addNewCommentListener();
                        });
                });
            }
        });
}

const newCommentHandler = (event) => {

    const obj = ui.handlerComments(event);

    data.postNewComment(obj.newComment)
        .then((response) => {
            repeatNewCommentHandler(obj.post)
        });
}

const repeatNewCommentHandler = (postId) => {
    getCommentsHandler(postId);
}

const addNewCommentListener = () => {

    const inputValue = document.querySelector(".comment-button");
    inputValue.addEventListener("click", newCommentHandler);
}

const initSinglePostPage = () => {

    const feedPost = document.querySelectorAll(".post-event");
    feedPost.forEach((singlePost) => {
        singlePost.addEventListener("click", singlePostHandler);
    });
}

const profilePageHandler = (event) => {

    const inputField = document.querySelector(".search-users");
    if (inputField) {
        inputField.setAttribute("class", "hide");
    }

    data.getProfile()
        .then((profile) => {
            localStorage.setItem("user-id", profile.id);
            localStorage.setItem("user-profile", JSON.stringify(profile));
            ui.createMyProfilePage(profile);
            setTimeout(initProfileModal, 1000)
        })
}

const initProfilePage = () => {
    const profilePage = document.querySelectorAll(".profile-page");
    profilePage.forEach((profile) => {
        profile.addEventListener("click", profilePageHandler);
    });
}

const updateProfileHandler = (event) => {

    const dataToUpdate = ui.updateProfileHandler(event);

    data.updateProfile(dataToUpdate)
        .then((response) => {
            profilePageHandler();
        })
}

const initProfileModal = () => {
    const update = document.querySelector("#update-profile");
    update.addEventListener("click", updateProfileHandler);
}

export const init = () => {

    initLoginPage();
    ui.displayFooter();
}