export class Comment {
    constructor(id, dateCreated, body, postId, authorName, authorId) {
        this.id = id;
        this.dateCreated = dateCreated;
        this.body = body;
        this.postId = postId;
        this.authorName = authorName;
        this.authorId = authorId;
    }
}