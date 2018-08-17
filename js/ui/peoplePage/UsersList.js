const root = document.querySelector(".root");

const createSearch = () => {

    const header = document.querySelector("header"); 
    const div = document.createElement("div");
    div.setAttribute("class", "container")
    header.appendChild(div);

    const inputField = document.createElement("input");
    inputField.setAttribute("type", "text");
    inputField.setAttribute("placeholder", "Search users...");
    inputField.setAttribute("class", "col-sm-12 col-lg-11 offset-lg-1 search-users");
    div.appendChild(inputField);
}

export const createUsersList = (users) => {

    const inputField = document.querySelector(".search-users");
    
    if(!inputField) {
        createSearch();
    }
    
    root.innerHTML = "";
    const usersList = document.createElement("ul");
    usersList.setAttribute("class", "container users-list");
    const row = document.createElement("div");
    row.setAttribute("class", "row search-input");
    usersList.appendChild(row);
    
    users.forEach((user) => {
        const userLi = document.createElement("li");
        userLi.setAttribute("class", "user-li col-md-12 col-lg-5 offset-lg-1");
        userLi.innerHTML = `
        <div class="container">
            <div class="row">
                <img src=${user.avatarUrl} alt="avatar" class=" user-img"/>
                <span class="user-name" user-id="${user.id}"> ${user.name} </span>
            </div>
        </div>
        `;
        root.appendChild(usersList);
        usersList.appendChild(userLi);
    });
}

export const goToUserProfile = (user) => {
    
    root.innerHTML = "";

        const profile = document.createElement("div");
        profile.innerHTML = `
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 profile-photo">
                        <img src=${user.avatarUrl === "" ? "http://www.iglax.org/wp-content/uploads/2014/12/placeholder-Copy-11-1.png" : user.avatarUrl} alt="user profile photo" class="user-profile-photo" />
                    </div>
                    <div class="col-sm-6 offset-3 user-name">
                        ${user.name}
                    </div>
                    <p class="col-lg-12">
                        <b>About:</b> ${user.aboutShort}
                    </p>
                    <div class="col-sm-12 col-md-12 col-lg-2 offset-lg-4 div-posts-count">
                        <span id="posts-count"> ${user.postsCount} posts </span>
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-2 div-comments-count">
                        <span id="comments-count">${user.commentsCount} comments </span>
                    </div>
                </div>
            </div>
        `;
        root.appendChild(profile);
}



