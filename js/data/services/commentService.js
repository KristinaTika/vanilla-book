import { get, post } from "./APIService.js";
import { commentsEndpoint, newCommentEndpoint } from "../shared/constants.js";
import { Comment } from "../entities/Comment.js";


class CommentService {

    fetchComments(postId) {

        let url = (`${commentsEndpoint}${postId}`);
        
        return get(url)
            .then((comments) => { 
                return comments.map((comment) => {
                    const id = comment.id;
                    const dateCreated = comment.dateCreated;
                    const body = comment.body;
                    const postId = comment.postId;
                    const authorName = comment.authorName;
                    const authorId = comment.authorId;

                    const myComment = new Comment(id, dateCreated, body, postId, authorName, authorId)
                    return myComment;
                });
            });
    }

    postNewComment(commentData) {
        return post(`${newCommentEndpoint}`, commentData);
    }
}

export const commentService = new CommentService;