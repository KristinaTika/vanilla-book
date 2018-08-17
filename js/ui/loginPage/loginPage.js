const root = document.querySelector(".root");
const body = document.querySelector("body");

export const createLoginHeader = () => {

    const header = document.createElement("header");
    header.innerHTML = `
        <header id="welcome-header">
             Virtual life
        </header>
    `;
    body.insertBefore(header, body.firstChild);
}

export const loginPage = () => {

    root.innerHTML = "";

    const login = document.createElement("div");
    login.setAttribute("class", "login-page");
    login.innerHTML = `
    <div class="container">
        <div class="row">
            <div class="col-lg-6 welcome-div">
                <h1 class="welcome-title"> Virtual life Login </h1>
                <p class="welcome-text"> Welcome to Virtual life. Create an account or log in to our social network.</p> <p>Connect with friends, family and other people you know.</p>
            <p>Share photos and videos and get updates.</p>
            </div>
            <div class="login-form">
                <div class="titles">
                    <span class="login-title">Login</span>
                    <span class="register-title">Register</span>
                </div>
                <div class="form-inputs" id="login-inputs">
                    <p><b>Username</b></p>
                    <input type="text" placeholder="enter username" id="username" required />
                    <p><b>Password</b></p>
                    <input type="password" placeholder="enter password" id="login-password" required />
                    <input type="button" class="login-button" value="login" />
                </div>

                <div class="form-inputs" id="register-inputs">
                    <p><b>Full Name</b></p>
                    <input type="text" placeholder="Full Name" id="full-name" required/>
                    <p><b>Username</b></p>
                    <input type="text" placeholder="Username" id="nickname" required/>
                    <p><b>Email</b></p>
                    <input type="email" placeholder="Email Address" id="email-address" required/>
                    <p><b>Password</b></p>
                    <input type="password" placeholder="At least 6 characters long" id="register-password" required/>
                    <input type="button" class="register-button" value="register" />
                </div>     
            </div>

        </div>
    </div>
    `;
    root.appendChild(login);

    const registerForm = document.querySelector("#register-inputs");
    registerForm.style.display = "none";

    const register = document.querySelector(".register-title");
    register.addEventListener("click", changeToRegisterHandler);
}

export const loginHandler = (event) => {

    event.preventDefault();

    const usernameInput = document.querySelector("#username");
    const username = usernameInput.value;
    const passwordInput = document.querySelector("#login-password");
    const password = passwordInput.value;

    const header = document.querySelector("#welcome-header");
    header.style.display = "none";

    return {
        username,
        password
    }
}

const changeToRegisterHandler = (event) => {

    const title = document.querySelector(".welcome-title"); 
    title.textContent = "Virtual Life Register";

    const login = document.querySelector("#login-inputs");
    login.style.display = "none";

    const register = document.querySelector("#register-inputs");
    register.style.display = "block";

    const loginSpan = document.querySelector(".login-title");
    loginSpan.addEventListener("click", handler);
}

const handler = (event) => {

    const loginSpan = document.querySelector("#login-inputs");
    loginSpan.style.display = "block";

    const register = document.querySelector("#register-inputs");
    register.style.display = "none";

    const title = document.querySelector(".welcome-title");
    title.textContent = "Virtual Life Login";
}

export const registerHandler = (event) => {

    event.preventDefault();

    const fullNameInput = document.querySelector("#full-name");
    const name = fullNameInput.value;

    const usernameInput = document.querySelector("#nickname");
    const username = usernameInput.value;

    
    const email = validateEmail();
    const password = validatePassword();

    return {
        username,
        password,
        name,
        email
    }
}

const validateEmail = () => {

    const email = document.querySelector("#email-address");
    const mailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!email.value.match(mailFormat)) {
        alert("Please provide a valid email address!");
        email.focus;
        return false;
    } 
    return email.value;
}

const validatePassword = () => {

    const passwordInput = document.querySelector("#register-password");
    const password = passwordInput.value;
    if(password.length > 5) {
        return password;
    }
    alert("Password has to be at least 6 characters long!")
    return false;
}








