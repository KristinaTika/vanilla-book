import { Post } from "./Post.js";

export class TextPost extends Post {
    //static TYPE = 'text';

    constructor(id, date, userId, userDisplayName, type, commentsNum, likes, text ) {
        super(id, date, userId, userDisplayName, type, commentsNum, likes)

        this.text = text;
    }
}

