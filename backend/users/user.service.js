const e = require('express');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema (
    {
        login : {
            type: String,
            required: true
        },
        email : {
            type: String,
            required: true
        },
        password : {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

exports.User = mongoose.model('User', userSchema);