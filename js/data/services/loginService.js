import { loginEndpoint, registerEndpoint } from "../shared/constants.js";
import { post } from "./APIService.js";

class LoginService {

    loginUser(data) {
        return post(loginEndpoint, data);
    }

    registerUser(data) {
        return post(registerEndpoint, data);     
    }
}

export const loginService = new LoginService;