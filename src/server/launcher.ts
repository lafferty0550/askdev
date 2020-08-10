import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import bodyParser from 'body-parser';

import router from './routes';

if (process.env.NODE_ENV !== 'production')
    require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use('/api', router);
app.use(express.static(path.resolve('build', 'public')));

(async () => {
    try {
        if (typeof process.env.NODE_ENV !== 'undefined') {
            await mongoose.connect(process.env.MONGODB_URI as string, {
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

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));