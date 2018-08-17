export class User {
    constructor(id, name, aboutShort, lastPostDate, avatarUrl, postsCount, commentsCount) {
        this.id = id;
        this.name = name;
        this.aboutShort = aboutShort;
        this.lastPostDate = lastPostDate;
        this.avatarUrl = avatarUrl;
        this.postsCount = postsCount;
        this.commentsCount = commentsCount;
    }
}