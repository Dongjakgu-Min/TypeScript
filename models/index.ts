import mongoose from 'mongoose';
import surveySchema from './schema/memo';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI as string, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const db = Object.assign({}, surveySchema);

export default db;