import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const memo = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isDeleted: {
        type: String,
        required: true,
        default: false
    }
});

const Memo = mongoose.model('Memo', memo);
export default { Memo }