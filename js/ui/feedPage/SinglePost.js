const root = document.querySelector(".root");

const createSingleTextPost = (post, comments) => {

    const singlePost = document.createElement("div");
    singlePost.setAttribute("id", "text");
    singlePost.setAttribute("class", "container");

    singlePost.innerHTML = `
        <div class="row">
            <div class="content-box">
                <div class="post-content text" post-id=${post.id} user-id=${post.userId}>
                    ${post.text}
                </div>
            </div>
        </div>
    `;
    root.appendChild(singlePost);

    if (comments.length === 0) {
        createButtons(singlePost);
    } else {
        createButtons(singlePost);
        createCommentList(comments, singlePost);
    }
}

const createSingleVideoPost = (post, comments) => {

    const singlePost = document.createElement("div");
    singlePost.setAttribute("id", "video");
    singlePost.setAttribute("class", "container");
    singlePost.innerHTML = `
        <div class="container>
            <div class="row">
                <div user-id=${post.userId} class="content-box" >
                    <iframe width='100%' height='300' src=${post.videoUrl} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                </div>
            </div>
        </div>
    `;
    root.appendChild(singlePost);

    if (comments.length === 0) {
        createButtons(singlePost);
    } else {
        createButtons(singlePost);
        createCommentList(comments, singlePost);
    }
}

const createSingleImagePost = (post, comments) => {

    const singlePost = document.createElement("div");
    singlePost.setAttribute("id", "image");
    singlePost.setAttribute("class", "container");
    singlePost.innerHTML = `
        <div class="">
            <div class="row">
                <div class="content-box" user-id=${post.userId}>
                    <img src="${post.imageUrl}" alt="${post.type}" class="single-img" />
                </div>
            </div>
        </div>
    `;
    root.appendChild(singlePost);

    if (comments.length === 0) {
        createButtons(singlePost);
    } else {
        createButtons(singlePost);
        createCommentList(comments, singlePost);
    }
}

const createButtons = (singlePost) => {

    const comValue = document.createElement("input");
    comValue.setAttribute("type", "text");
    comValue.setAttribute("placeholder", "Add your comment");
    comValue.setAttribute("class", "col-sm-10 comment-value");
    singlePost.appendChild(comValue);

    const button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("value", "SEND");
    button.setAttribute("class", "col-sm-2 comment-button");
    singlePost.appendChild(button);
}

const createCommentList = (comments, singlePost) => {

    const commentList = document.createElement("ul");
    commentList.setAttribute("class", "comments-list container");
    singlePost.appendChild(commentList);

    comments.forEach((comment) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const commentLi = document.createElement("li");
        commentLi.setAttribute("class", "single-comment");
        commentLi.innerHTML = `
                <div class="row">
                    <div class="col-sm-3">
                        <img src="${user.avatarUrl}" alt="avatar" class="user-image" />
                        <p class="comment-name">${user.name}</p>
                    </div>
                    <div class="col-sm-9 comment-content">
                    ${comment.body}
                    </div>
                </div>
            `;
        commentList.appendChild(commentLi);
    });
}

const collectCommentInput = () => {

    const inputValue = document.querySelector(".comment-value");
    const input = inputValue.value;
    return input;
}

export const createSinglePost = (post, comments) => {

    root.innerHTML = "";

    switch (post.type) {
        case "text":
            return createSingleTextPost(post, comments);
        case "video":
            return createSingleVideoPost(post, comments);
        case "image":
            return createSingleImagePost(post, comments);
        default:
            console.log("no post to show.");
    }
}

export const clearSearchInput = () => {

    const searchInput = document.querySelector(".comment-value");
    searchInput.value = "";
}

export const handlerComments = (event) => {

    event.preventDefault();

    const inputValue = collectCommentInput();

    if (inputValue === "") {
        return;
    } else {
        const post = JSON.parse(localStorage.getItem("post"));
        const loggedUser = JSON.parse(localStorage.getItem("user"));
        const userId = post.userId;
        const postId = post.id;

        const newComment = {
            id: "1",
            dateCreated: Date.now,
            body: inputValue,
            postId: postId,
            authorName: loggedUser.name,
            authorId: userId
        }

        return {
            newComment,
            post
        }
    }

}

