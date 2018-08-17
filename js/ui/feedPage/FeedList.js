const root = document.querySelector(".root");
const loggedUser = JSON.parse(localStorage.getItem("user-profile"));

const postList = document.createElement("ul");
postList.setAttribute("class", "container main-post-list");

const createTextPost = (post) => {

    const postLi = document.createElement("li");
    postLi.setAttribute("class", "feed-post text-post");
    postLi.innerHTML = `
    <div class="container" post-id=${post.id}> 
        <input type="button" post-id=${post.id} class="delete-button" value="delete" id="${loggedUser.id === post.userId ? "" : "hide"}" />   
        <div class="row" user-id=${post.userId}>
            <div class="post-content">
                ${post.text}
            </div>
        </div>
        <div class="post-info">
            <span class="post-event comments-color" post-id=${post.id} post-type=${post.type} user-id=${post.userId}> 
                ${post.commentsNum} comments 
            </span>
            <span class="post-type"> 
                <i class="fas fa-thumbs-up likes-counter" post-id=${post.id}>${post.likesNum}</i> 
            </span>
        </div>
        <hr />
        <br />
        <div post-id=${post.id}>
            <span class="like-button" post-id=${post.id}>
                <i class="far fa-thumbs-up"></i> Like
            </span>
            <span class="post-event text-event" post-id=${post.id} post-type=${post.type} user-id=${post.userId}>
                <i class="far fa-comment" post-id=${post.id} post-type=${post.type} user-id=${post.userId}></i> Comment
            </span>
        </div>
    </div>
    `;
    postList.appendChild(postLi);
}

const createVideoPost = (post) => {

    const postLi = document.createElement("li");
    postLi.setAttribute("class", "feed-post video-post");
    postLi.innerHTML = `
        <div class="container" post-id=${post.id}>
        <input type="button" post-id=${post.id} class="delete-button" value="delete" id="${loggedUser.id === post.userId ? "" : "hide"}" />   
            <div class="row" user-id=${post.userId}>
                <div class="video-content">
                    <iframe width='100%' height='300' src=${post.videoUrl} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                </div>
            </div>
            <div class="col-12">
                <span class="post-event comments-color" post-id=${post.id} post-type=${post.type} user-id=${post.userId}> 
                    ${post.commentsNum} comments
                </span>
                <span class="post-type"> 
                    <i class="fas fa-thumbs-up likes-counter" post-id=${post.id}>${post.likesNum}</i> 
                </span>
            </div>
            <hr />
            <br />
            <div post-id=${post.id}>
                <span class="like-button" post-id=${post.id}>
                    <i class="far fa-thumbs-up"></i> Like
                </span>
                <span class="post-event text-event" post-id=${post.id} post-type=${post.type} user-id=${post.userId}>
                    <i class="far fa-comment" post-id=${post.id} post-type=${post.type} user-id=${post.userId}></i> Comment
                </span>
            </div>
        </div>
     `;
    postList.appendChild(postLi);
}

const createImagePost = (post) => {

    const postLi = document.createElement("li");
    postLi.setAttribute("class", "feed-post image-post");
    postLi.innerHTML = `
    <div class="container feed-image-post" post-id=${post.id}>
        <input type="button" post-id=${post.id} class="delete-button" value="delete" id="${loggedUser.id === post.userId ? "" : "hide"}" />   
        <div class="post-content" user-id=${post.userId}>
            <img src=${post.imageUrl} alt=${post.type} class="feed-img" />
        </div>
        <div class="post-event">           
            <span class="post-event comments-color" post-id=${post.id} post-type=${post.type} user-id=${post.userId}> 
                ${post.commentsNum} comments 
            </span>
            <span class="post-type"> 
                <i class="fas fa-thumbs-up likes-counter" post-id=${post.id}>${post.likesNum}</i> 
            </span>
        </div>
        <hr />
        <br />
        <div post-id=${post.id}>
            <span class="like-button" post-id=${post.id}>
                <i class="far fa-thumbs-up"></i> Like
            </span>
            <span class="post-event text-event" post-id=${post.id} post-type=${post.type} user-id=${post.userId}>
                <i class="far fa-comment" post-id=${post.id} post-type=${post.type} user-id=${post.userId}></i> Comment
            </span>
        </div>
    </div>
    `;
    postList.appendChild(postLi);
}

const createFilterMenu = () => {

    const div = document.createElement("div");
    div.setAttribute("id", "filter-container");
    root.insertBefore(div, root.firstChild);

    const filterButton = document.createElement("select");
    filterButton.setAttribute("class", "filter-posts");
    filterButton.innerHTML = `
        <option value="-">Filter Posts</option>
        <option value="all" id="all-posts">All Posts</option>
        <option value="image" id="image-posts">Image Posts</option>
        <option value="text" id="text-posts">Text Posts</option>
        <option value="video" id="video-posts">Video Posts</option>
    `;
    div.appendChild(filterButton);
    filterButton.addEventListener("change", filterPostsHandler);
}

const noFeed = () => {

    const noFeed = document.createElement("div");
    noFeed.setAttribute("class", "no-feed");
    noFeed.textContent = "No posts to show.";
    root.appendChild(noFeed);
}

const loadingContent = () => {

    const noFeed = document.createElement("div");
    noFeed.setAttribute("class", "loading");
    noFeed.textContent = "Loading...";
    root.appendChild(noFeed);
}

const activateModal = (event) => {

    const modal = document.querySelector('#myModal');
    const span = document.querySelector(".close");

    modal.style.display = "block";

    window.addEventListener("click", (event) => {
        if (event.target.className === "close") {
            modal.style.display = "none";
        }
    });
}

const createNewPostButton = () => {

    const createButton = document.createElement("div");
    createButton.setAttribute("id", "create-post-button");
    createButton.setAttribute("class", "myBtn");
    createButton.innerHTML = `
        <span alt="create new post" > <i class="fas fa-plus-circle"></i> </span>
        <div id="myModal" class="modal">
            <div class="modal-content">
                <span class="close">X</span>
                <div class="modal-header">
                    <h2>New Post</h2>
                </div>
                <div class="modal-body">
                   <input type="text" id="post-value" placeholder="What's on your mind?" />  
                </div>
                 <div class="modal-footer">
                   <input type="submit" value="Post" id="create-new-post"/>
                </div>
            </div>
        </div>
    `;
    root.prepend(createButton);
}

const validatePost = (value) => {

    const user = JSON.parse(localStorage.getItem("user-profile"));
    let dataToPost = {};

    if (value.includes("https://www.youtube.com/")) {
        return dataToPost = {
            "videoUrl": value,
            id: user.id,
            date: Date.now(),
            userDisplayName: user.name,
            type: "video",
            commentsNum: user.commentsCount
        }

    } else if (value.includes("http://www.") && value.includes(".jpeg") || value.includes(".jpg") || value.includes(".png") || value.includes(".svg") || value.includes(".gif")) {
        return dataToPost = {
            "imageUrl": value,
            id: user.id,
            date: Date.now(),
            userDisplayName: user.name,
            type: "image",
            commentsNum: user.commentsCount
        }
    } else {
        return dataToPost = {
            "text": value,
            id: user.id,
            date: Date.now(),
            userDisplayName: user.name,
            type: "text",
            commentsNum: user.commentsCount
        }
    }
}

export const deleteHandler = (event) => {

    event.preventDefault();
    const postId = event.target.getAttribute("post-id");

    return postId;
}

export const newPostHandler = (event) => {

    event.preventDefault();

    const inputValue = document.querySelector("#post-value");
    const value = inputValue.value;
    const dataToPost = validatePost(value);

    return dataToPost;
}

export const createFeedList = (posts) => {

    root.innerHTML = "";
    root.appendChild(postList);
    postList.innerHTML = "";

    createNewPostButton();

    if (posts.length === 0) {
        return loadingContent();
    }

    posts.forEach((post) => {

        switch (post.type) {
            case "text":
                return createTextPost(post);
            case "image":
                return createImagePost(post);
            case "video":
                return createVideoPost(post);
            default:
                return noFeed();
        }
    });

    createFilterMenu();

    const createButton = document.querySelector("#create-post-button");
    createButton.addEventListener("click", activateModal);
}

export const filterTextPost = () => {

    createFilterMenu();

    const posts = JSON.parse(localStorage.getItem("posts"));
    let filteredPosts = [];

    posts.filter((post) => {
        post.type == event.target.value ? filteredPosts.push(post) : "";
    })
    filteredPosts.forEach((post) => {
        const postLi = document.createElement("li");
        postLi.setAttribute("class", "container feed-post text-post");
        postLi.innerHTML = `
            <div class="container" post-id=${post.id}> 
            <input type="button" post-id=${post.id} class="delete-button" value="delete" id="${loggedUser.id === post.userId ? "" : "hide"}" />    
                <div class="row" user-id=${post.userId}>
                    <div class="post-content">
                        ${post.text}
                    </div>
                </div>
                <div>
                    <span class="post-type"> 
                        ${post.type} post 
                    </span>
                   <a href="#" class="post-event" post-id=${post.id} post-type=${post.type} user-id=${post.userId}> 
                        ${post.commentsNum} comments 
                    </a>
                </div>
            </div>
            `;
        root.appendChild(postLi);
    })
}

export const filterVideoPost = () => {

    createFilterMenu();

    const posts = JSON.parse(localStorage.getItem("posts"));
    let filteredPosts = [];

    posts.filter((post) => {
        post.type == event.target.value ? filteredPosts.push(post) : "";
    })
    filteredPosts.forEach((post) => {

        const postLi = document.createElement("li");
        postLi.setAttribute("class", "container feed-post video-post");
        postLi.innerHTML = `
        <div class="container" post-id=${post.id}>
        <input type="button" post-id=${post.id} class="delete-button" value="delete" id="${loggedUser.id === post.userId ? "" : "hide"}" /> 
            <div class="row" user-id=${post.userId}>
                <div class="video-content">
                    <iframe width='100%' height='300' src=${post.videoUrl} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                </div>
            </div>
            <div class="col-12">
                <span class="post-type">
                    ${post.type} post 
                </span>
                <a href="#" class="post-event" post-id=${post.id} post-type=${post.type} user-id=${post.userId}> 
                    ${post.commentsNum} comments
                </a>
            </div>
        </div>
    `;
        root.appendChild(postLi);
    });
}

export const filterImagePost = () => {

    createFilterMenu()

    const posts = JSON.parse(localStorage.getItem("posts"));
    let filteredPosts = [];

    posts.filter((post) => {
        post.type == event.target.value ? filteredPosts.push(post) : "";
    })
    filteredPosts.forEach((post) => {

        const postLi = document.createElement("li");
        postLi.setAttribute("class", "container feed-post image-post");
        postLi.innerHTML = `
    <div class="container feed-image-post" post-id=${post.id}>
    <input type="button" post-id=${post.id} class="delete-button" value="delete" id="${loggedUser.id === post.userId ? "" : "hide"}" /> 
        <div class="post-content" user-id=${post.userId}>
            <img src=${post.imageUrl} alt=${post.type} class="feed-img" />
        </div>
        <div class="post-event">
            <span class="post-type">
                ${post.type} post 
            </span>
            <a href="#" class="post-event" post-id=${post.id} post-type=${post.type} user-id=${post.userId}> 
                ${post.commentsNum} comments 
            </a>
        </div>
    </div>
    `;
        root.appendChild(postLi);
    });
}

export const filterPostsHandler = (event) => {

    const posts = JSON.parse(localStorage.getItem("posts"));
    root.innerHTML = "";

    if (event.target.value === "text") {
        return filterTextPost();
    }
    else if (event.target.value === "video") {
        return filterVideoPost();
    }
    else if (event.target.value === "image") {
        return filterImagePost();
    }

    else if (event.target.value === "all") {
        return createFeedList(posts);
    }
}

