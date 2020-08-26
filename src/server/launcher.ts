import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import bodyParser from 'body-parser';

import router from './routes';
import {MONGODB_URI, PORT} from '$server/constants';

const app = express();

app.use(bodyParser.json());
app.use('/api', router);
app.use(express.static(path.resolve('build', 'public')));

/**
 * process.env.MONGODB_URI and process.env.PORT used by heroku app
 */

(async () => {
    try {
        if (typeof process.env.NODE_ENV !== 'undefined') {
            await mongoose.connect(<string>process.env.MONGODB_URI || MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Connected to DB');
        } else
            console.error('process.env.NODE_ENV is undefined');
    } catch (err) {
        console.error(err.toString());
    }
})();

app.listen(process.env.PORT || PORT, () => console.log(`Listening on port ${process.env.PORT}`));