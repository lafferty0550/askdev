import mongoose from 'mongoose';
if (process.env.mode === 'development')
    require('dotenv').config();

import Generator from './db-generator';
import db from '../server/models';

(async () => {
    console.log('INITIALIZATING DATABASE BY DEFAULT VALUES...');

    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/askdev', {
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