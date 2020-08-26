import mongoose from 'mongoose';

import Generator from './db-generator';
import db from '../server/models';
import {MONGODB_URI} from '$server/constants';

(async () => {
    console.log('INITIALIZATING DATABASE BY DEFAULT VALUES...');

    try {
        await mongoose.connect(process.env.MONGODB_URI || MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await Generator.init(db);

        await mongoose.connection.close();
        console.log('INITIALIZATION IS SUCCESS...');
    } catch(err) {
        console.error(err.toString());
    }
})()