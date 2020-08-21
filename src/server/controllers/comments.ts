import {Request, Response} from 'express';

import db, {IComment} from '$models';
import {PostCommentPayload, PostCommentQuery, PostCommentResponse} from '$common/types';
import Tools from '$server/tools';
import {typedSend} from '$server/generics';
import {POST_SUCCESS} from '$server/constants';

export const postComment = async (req: Request, res: Response) => {
    const _send = typedSend<PostCommentResponse>(res);
    try {
        const {target, id} = <PostCommentQuery>req.query;
        const {body}: PostCommentPayload = req.body;
        const token = <string>req.headers['x-access-token'];

        const userID: string = Tools.getUserIdFromJWT(token);
        const comment: IComment = await db.comment.create({body, user: userID, date: new Date()});
        await db.user.updateOne({_id: userID}, {$push: {comments: comment._id}});
        await db[target].updateOne({_id: id}, {$push: {comments: comment._id}});
        _send({msg: POST_SUCCESS});
    } catch (err) {
        _send({msg: err.toString()}, 500);
    }
};