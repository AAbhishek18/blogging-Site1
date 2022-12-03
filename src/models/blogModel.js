
const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({


    title: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },

    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        required: true,
    },

    tags: [String],

    category: {
        type: String,
        required: true
    },

    subcategory: [String],

    isPublished:{
        type:Boolean,
        default:false
    },

    publishedAt:{
        type: String,
        default:""
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    deletedAt: {type : String, default : ""},


}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema)

