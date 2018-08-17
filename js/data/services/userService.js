import { get, put } from "./APIService.js";
import { usersEndpoint, profileEndpoint, updateProfileEndpoint } from "../shared/constants.js";
import { User } from "../entities/User.js";

class UserService {

    fetchUsers() {
        return get(usersEndpoint)
            .then((users) => {
                return users.map((user) => {
                    const id = user.id;
                    const name = user.name;
                    const about = user.aboutShort;
                    const postDate = user.lastPostDate;
                    const avatarUrl = user.avatarUrl;
                    const postsCount = user.postsCount;
                    const commentsCount = user.commentsCount;

                    const myUser = new User(id, name, about, postDate, avatarUrl, postsCount, commentsCount);
                    return myUser;
                });
            });
    }

    fetchSingleUser(id) {
        let url = (`${usersEndpoint}/${id}`);
        return get(url)
            .then((user) => {
                    const id = user.userId;
                    const name = user.name;
                    const about = user.aboutShort;
                    const postDate = user.lastPostDate;
                    const avatarUrl = user.avatarUrl;
                    const postsCount = user.postsCount;
                    const commentsCount = user.commentsCount;

                    const myUser = new User(id, name, about, postDate, avatarUrl, postsCount, commentsCount);
                    return myUser;
                });
    }

    fetchProfile() {
        return get(profileEndpoint)
            .then((profile) => { 
                const id = profile.userId;
                const name = profile.name;
                const about = profile.aboutShort;
                const postDate = profile.lastPostDate;
                const avatarUrl = profile.avatarUrl;
                const postsCount = profile.postsCount;
                const commentsCount = profile.commentsCount;

                const myUser = new User(id, name, about, postDate, avatarUrl, postsCount, commentsCount);
                return myUser;
            });
    }

    updateProfile(data) {
        return put(updateProfileEndpoint, data);
    }
}

export const userService = new UserService;