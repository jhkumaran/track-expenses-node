const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    billingMonth: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    }
});

expenseSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
expenseSchema.set('toJSON', {
    virtuals: true,
});

exports.Expense = mongoose.model('Expense', expenseSchema);