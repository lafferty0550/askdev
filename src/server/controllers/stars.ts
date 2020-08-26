import {Request, Response} from 'express';

import db from '$models';
import {IUser, PostStarQuery, PostStarResponse} from '$common/types';
import Tools from '$server/tools';
import {typedSend} from '$server/generics';
import {STAR_SUCCESS} from '$server/constants';

export const postStar = async (req: Request, res: Response) => {
    const _send = typedSend<PostStarResponse>(res);
    try {
        const {target, id} = <PostStarQuery>req.query;
        const token = <string>req.headers['x-access-token'];
        const userID: string = Tools.getUserIdFromJWT(token);
        let count: number;
        const user: IUser = await db.user.findById(userID).lean();

        /**
         * addStar works similar to addLike
         * @see ./likes.ts
         */
        const addStar = async (target: 'question', inc: number) => {
            let targetDoc = await db[target].findOneAndUpdate({_id: id}, {$inc: {stars: inc}}, {new: true});
            await db.user.updateOne(
                {_id: userID},
                {
                    [(inc > 0) ? '$push' : '$pull']: {staredQuestions: targetDoc._id}
                }
            );
            return targetDoc.stars;
        };

        if (user.staredQuestions.some((question: any) => question.equals(id))) {
            count = await addStar(target, -1);
        } else {
            count = await addStar(target, 1);
        }
        _send({data: {count}, msg: STAR_SUCCESS});
    } catch (err) {
        _send({msg: err.toString()}, 500);
    }
};