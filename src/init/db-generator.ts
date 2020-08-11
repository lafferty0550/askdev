import {Model} from 'mongoose';

import {IQuestionDoc} from '../server/models';
import questions from './questions';
import {IQuestion} from '../common/types';

export default class Generator {
    static db: any;

    static async init(db: any) {
        this.db = db;
        await Generator.generate();
    }

    static async generate() {
        await Generator.setData(
            'question',
            questions,
            async (item: IQuestion, model: Model<IQuestionDoc>) => await new model(item).save()
        );
    }

    static async setData(
        collection: string,
        data: Array<IQuestion>,
        handler: (item: IQuestion, model: Model<IQuestionDoc>) => Promise<IQuestionDoc>
    ) {
        console.log(12312)
        await this.db[collection].deleteMany({});
        for (const item of data)
            await handler(item, this.db[collection]);
    }
}