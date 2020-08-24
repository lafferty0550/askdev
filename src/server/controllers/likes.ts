import {Request, Response} from 'express';

import db from '$models';
import {IQuestion, IUser, PostLikeQuery, PostLikeResponse} from '$common/types';
import Tools from '$server/tools';
import {typedSend} from '$server/generics';
import {LIKE_SUCCESS} from '$server/constants';

export const postLike = async (req: Request, res: Response) => {
    const _send = typedSend<PostLikeResponse>(res);
    try {
        const {target, id} = <PostLikeQuery>req.query;
        const token = <string>req.headers['x-access-token'];
        const userID: string = Tools.getUserIdFromJWT(token);
        let count: number = 0;
        if (target === 'question') {
            const user: IUser = await db.user.findById(userID).lean();
            if (user.likedQuestions.some((question: any) => question.equals(id))) {
                const question: IQuestion = await db.question.findOneAndUpdate({_id: id}, {$inc: {likes: -1}}, {new: true});
                await db.user.updateOne({_id: userID}, {$pull: {likedQuestions: question._id}});
                count = question.likes;
            } else {
                const question: IQuestion = await db.question.findOneAndUpdate({_id: id}, {$inc: {likes: 1}}, {new: true});
                await db.user.updateOne({_id: userID}, {$push: {likedQuestions: question._id}});
                count = question.likes;
            }
        }
        _send({data: {count}, msg: LIKE_SUCCESS});
    } catch (err) {
        _send({msg: err.toString()}, 500);
    }
};