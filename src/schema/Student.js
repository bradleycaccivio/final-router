"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
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
    }
});

StudentSchema.statics.create = function(obj) {
    const Student = mongoose.model("Student", StudentSchema);
    const student = new Student();
    student.name = obj.name;
    student.usrname = obj.usrname;
    student.pswrd = obj.pswrd;
    return student;
}

module.exports = mongoose.model("Student", StudentSchema);
