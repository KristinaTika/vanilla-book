import { loginEndpoint, registerEndpoint } from "../shared/constants.js";
import { post } from "./APIService.js";

class LoginService {

    loginUser(data) {
        return post(loginEndpoint, data)
            // .then((response) => {
            //     return response.status === 200 ? true : false
            // })
    }

    registerUser(data) {
        return post(registerEndpoint, data)
            // .then((response) => {
            //     return response.status === 200 ? true : false
            // })
           
    }
}

export const loginService = new LoginService;