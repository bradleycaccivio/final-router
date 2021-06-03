"use strict";

const Student = require("../../src/schema/Student");
const Instructor = require("../../src/schema/Instructor");
const Session = require("../../src/schema/Session");
const data = require("../data.json");
require("dotenv").config();

const env = "" + process.env.NODE_ENV;

const configObj = require("../config");
const config = configObj[env || "development"];
const mongoose = require("mongoose");


const populate = (callback) => {
    mongoose.connect(config.database, config.mongoConfig, err => {
        if (err) {
            console.log("Could not connect to database.");
        }
        const schemas = [ Student, Instructor, Session ];
        Promise
            .all(
                schemas.map(schema => schema.deleteMany())
            )
            .then(() => {
                return Student.insertMany(data.students);
            })
            .then(() => {
                return Instructor.insertMany(data.instructors);
            })
            .then(() => {
                return Session.insertMany(data.sessions);
            })
            .catch(err => {
                console.log(err);
                process.exit(1);
            })
            .finally(() => {
                if (callback) {
                    callback();
                } else {
                    console.log('Exiting');
                    process.exit(0);
                }
            });
    });
};

module.exports = populate;
