const mongoose = require('mongoose');

const categorySchema =  new mongoose.Schema({
    value: {
        type: String,
    },
    label: {
        type: String,
        required: true
    },
})
categorySchema.virtual('id').get(function(){
    return this._id.toHexString();
});
categorySchema.set('toJSON', {
    virtuals: true,
});

exports.Category = mongoose.model('Category', categorySchema);