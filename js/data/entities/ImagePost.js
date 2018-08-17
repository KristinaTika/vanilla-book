import { Post } from "./Post.js";

export class ImagePost extends Post {
    //static TYPE = 'image';

    constructor(id, date, userId, userDisplayName, type, commentsNum, likes, imageUrl) {
        super(id, date, userId, userDisplayName, type, commentsNum, likes)

        this.imageUrl = imageUrl;
    }
}






