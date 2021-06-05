"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InstructorSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    usrname: {
        type: Schema.Types.String,
        required: true
    },
    pswrd: {
        type: Schema.Types.String,
        required: true
    },
    type: {
        type: Schema.Types.String,
        required: true
    }
});

InstructorSchema.statics.create = function(obj) {
    const Instructor = mongoose.model("Instructor", InstructorSchema);
    const instructor = new Instructor();
    instructor.name = obj.name;
    instructor.usrname = obj.usrname;
    instructor.pswrd = obj.pswrd;
    instructor.type = obj.type;
    return instructor;
}

module.exports = mongoose.model("Instructor", InstructorSchema);
