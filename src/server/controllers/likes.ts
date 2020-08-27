import {Request, Response} from 'express';

import db from '$models';
import {IUser, PostLikeQuery, PostLikeResponse} from '$common/types';
import Tools from '$server/tools';
import {typedSend} from '$server/generics';
import {INVALID_TARGET, LIKE_SUCCESS} from '$server/constants';

export const postLike = async (req: Request, res: Response) => {
    const _send = typedSend<PostLikeResponse>(res);
    try {
        const {target, id} = <PostLikeQuery>req.query;
        const token = <string>req.headers['x-access-token'];
        const userID: string = Tools.getUserIdFromJWT(token);
        let count: number = 0;
        // find user
        const user: IUser = await db.user.findById(userID).lean();

        /**
         * addLike finds target and update its like count
         * then add/remove this target to/from user
         */
        const addLike = async (target: 'question' | 'comment', inc: number) => {
            let targetDoc = await db[target].findOneAndUpdate({_id: id}, {$inc: {likes: inc}}, {new: true});
            await db.user.updateOne(
                {_id: userID},
                {
                    [(inc > 0) ? '$push' : '$pull']: {
                        [(target === 'question') ? 'likedQuestions' : 'likedComments']: targetDoc._id
                    }
                }
            );
            return targetDoc.likes;
        };
        // if target is liked by user then decrease count by 1
        // otherwise increase by 1
        switch (target) {
            case 'question':
                if (user.likedQuestions.some((question: any) => question.equals(id)))
                    count = await addLike(target, -1);
                else
                    count = await addLike(target, 1);
                break;
            case 'comment':
                if (user.likedComments.some((comment: any) => comment.equals(id)))
                    count = await addLike(target, -1);
                else
                    count = await addLike(target, 1);
                break;
            default:
                return _send({msg: INVALID_TARGET}, 400);
        }
        _send({data: {count}, msg: LIKE_SUCCESS});
    } catch (err) {
        _send({msg: err.toString()}, 500);
    }
};