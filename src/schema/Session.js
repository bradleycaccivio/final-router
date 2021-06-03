"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    instructor: {
        type: Schema.Types.ObjectId,
        ref: "Instructor",
        required: true
    },
    students: [{
        type: Schema.Types.ObjectId, 
        ref: "Student"
    }],
    capacity: {
        type: Schema.Types.Number
    },
    day: {
        type: Schema.Types.Date,
        required: true
    }
});

SessionSchema.statics.create = function(obj) {
    const Session = mongoose.model("Session", SessionSchema);
    const session = new Session();
    session.instructor = obj.instructor;
    session.students = obj.students;
    session.capacity = obj.capacity;
    session.day = obj.day;
    return session;
}

module.exports = mongoose.model("Session", SessionSchema);
