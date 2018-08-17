const root = document.querySelector(".root");

export const createMyProfilePage = (user) => {

    root.innerHTML = "";

    const profile = document.createElement("div");
    profile.innerHTML = `
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 profile-photo">
                        <img src=${user.avatarUrl === "" ? "http://www.iglax.org/wp-content/uploads/2014/12/placeholder-Copy-11-1.png" : user.avatarUrl} alt="user profile photo" id="profile-photo" />
                    </div>
                    <div class="col-lg-12 user-name">
                        ${user.name}
                    </div>
                    <div class="col-lg-12 div-edit-profile">
                        <input type="button" class=" edit-profile" value="Edit Profile" id="myBtn" />
                    </div>
                    <p class="col-lg-12 about">
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

            <div id="myModal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h1 class="edit-title">Edit Profile</h1>
                    <span><b>Name:</b> </span><input type="text" id="update-name" placeholder="${user.name}" value=${user.name} />
                    <span><b>About:</b> </span><input type="text" id="update-about" placeholder="${user.aboutShort}" value=${user.aboutShort} />
                    <span><b>Photo:</b> </span><input type="text" id="update-photo-link" placeholder="${user.avatarUrl}" value=${user.avatarUrl} />
                    <input type="button" id="update-profile" value="Update" />
                </div>
            </div>
        `;
    root.appendChild(profile);

    const modal = document.querySelector('#myModal');
    const btn = document.querySelector("#myBtn");
    const span = document.getElementsByClassName("close")[0];

    btn.addEventListener("click", () => {
        modal.style.display = "block";
    })

    span.addEventListener("click", () => {
        modal.style.display = "none";
    })
}

export const updProfileHandler = (event) => {

    event.preventDefault();

    const nameInput = document.querySelector("#update-name");
    const name = nameInput.value;
    const aboutInput = document.querySelector("#update-about");
    const about = aboutInput.value;
    const photoInput = document.querySelector("#update-photo-link");
    const photo = photoInput.value;
    const profile = JSON.parse(localStorage.getItem("user-profile"));
    
    const checkName = (name) => {
        if (name === "") {
            return profile.name;
        }
        return name;
    }

    const checkPhoto = (photo) => {
        if (photo === "") {
            return profile.avatarUrl;
        }
        return photo
    }

    const checkedName = checkName(name);
    const checkedPhoto = checkPhoto(photo);

    const dataToUpdate = {
        userId: profile.id,
        name: checkedName,
        email: "bla@gmail.com",
        aboutShort: about,
        about: about,
        avatarUrl: checkedPhoto,
        commentsCount: profile.commentsCount
    }

    return dataToUpdate;
}
