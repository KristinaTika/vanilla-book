import { get, post, deleteData } from "./APIService.js";
import { postsEndpoint, urlEndpoint } from "../shared/constants.js";
import { Post } from "../entities/Post.js";
import { TextPost } from "../entities/TextPost.js";
import { ImagePost } from "../entities/ImagePost.js";
import { VideoPost } from "../entities/VideoPost.js";


class PostService {

    fetchPosts() {
        return get(postsEndpoint)
            .then(response => {
                return response.filter(post => {
                    if (post.videoUrl) {
                        return post.videoUrl.includes("https://www.youtube.com/embed")
                    }
                    return true
                })
            })
            .then((response) => {
                let likes = 0;
                return response.map((post) => {
                    switch (post.type) {
                        case "text":
                            return new TextPost(post.id, post.dateCreated, post.userId, post.userDisplayName, post.type, post.commentsNum, likes, post.text);
                        case "video":
                            return new VideoPost(post.id, post.dateCreated, post.userId, post.userDisplayName, post.type, post.commentsNum, likes, post.videoUrl);
                        case "image":
                            return new ImagePost(post.id, post.dateCreated, post.userId, post.userDisplayName, post.type, post.commentsNum, likes, post.imageUrl);
                        default:
                            console.log("no posts to show");
                    }
                })
            })
    }

    // deleteOldPosts() {
    //     return get(postsEndpoint)
    //         .then(response => {
    //             return response.filter(post => {
    //                 if (post.videoUrl) {
    //                     return post.videoUrl.includes("https://www.youtube.com/embed")
    //                 }
    //                 return true
    //             })
    //         })
    //         .then((oldPosts) => {
    //             oldPosts
    //                 .filter((post) => post.userId === 747)
    //                 .forEach((oldPost) => {

    //                     this.deletePost(oldPost.id)
    //                         .then((response) => {
    //                             console.log(response);
    //                         })
    //                 })

    //         })
    // }

    selectPostType(type) {

        let url = "";

        switch (type) {
            case "text":
                return url = `${urlEndpoint}TextPosts`;

            case "video":
                return url = `${urlEndpoint}VideoPosts`;

            case "image":
                return url = `${urlEndpoint}ImagePosts`;
            default:
                return "...";
        }

        return url;
    }

    fetchSinglePost(type, id) {

        const urlEndpoint = `${this.selectPostType(type)}/${id}`;
        return get(urlEndpoint);
    }

    postNewPost(type, newContent) {
        const url = `${this.selectPostType(type)}`;
        return post(url, newContent);
    }

    deletePost(id) {
        const url = `${postsEndpoint}/${id}`;
        return deleteData(url)
    }
}

export const postService = new PostService;


