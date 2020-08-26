import {Request, Response} from 'express';

import db from '$models';
import {PostCommentPayload, PostCommentQuery, PostCommentResponse} from '$common/types';
import Tools from '$server/tools';
import {typedSend} from '$server/generics';
import {POST_SUCCESS} from '$server/constants';
import {ICommentDoc} from '$models/comment';

export const postComment = async (req: Request, res: Response) => {
    const _send = typedSend<PostCommentResponse>(res);
    try {
        const {target, id} = <PostCommentQuery>req.query;
        const {body}: PostCommentPayload = req.body;
        const token = <string>req.headers['x-access-token'];

        // find user
        const userID: string = Tools.getUserIdFromJWT(token);
        // create comment
        const comment: ICommentDoc = await db.comment.create({body, user: userID, date: new Date()});
        // add comment to user comments
        await db.user.updateOne({_id: userID}, {$push: {comments: comment._id}});
        // add comment to target
        await db[target].updateOne({_id: id}, {$push: {comments: comment._id}});
        _send({data: await comment.populate('user').execPopulate(), msg: POST_SUCCESS});
    } catch (err) {
        _send({msg: err.toString()}, 500);
    }
};