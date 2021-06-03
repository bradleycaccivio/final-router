"use strict";

const resetDB = require("../config/scripts/populateDB")

const Student = require("./schema/Student");
const Instructor = require("./schema/Instructor");
const Session = require("./schema/Session");

const express = require("express");
const router = express.Router();


router.route("/reset")
    .get((_req, res) => {
        resetDB(() => {
            res.status(200).send({
                message: "Data has been reset."
            });
        });
    });

router.route("/")
    .get((_req, res) => {
        console.log("GET /");
        res.status(200).send({
            data: "App is running."
        });
    });
    
router.route("/students")
    .get((req, res) => {
        console.log("GET /students");
        Student.find({})
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    })
    .post((req, res) => {
        console.log("POST /students");
        let params = {
            name: req.body.name,
            usrname: req.body.usrname,
            pswrd: req.body.pswrd
        };
        for(let prop in params) if(!params[prop]) delete params[prop];
        var size = Object.keys(params).length;
        if (size < 3) {
            res.status(500).send();
        } else {
            Student.create(params).save()
                .then(data => {
                    res.status(201).send(data);
                })
                .catch(err => {
                    res.status(404).send();
                })
        }
    });

router.route("/students/:id")
    .get((req, res) => {
        console.log(`GET /students/${req.params.id}`);
        Student.findById(`${req.params.id}`)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(404).send();
            })
    })
    .patch((req, res) => {
        console.log(`PATCH /students/${req.params.id}`);
        let params = {
            name: req.body.name
        };
        for(let prop in params) if(!params[prop]) delete params[prop];
        Student.findOneAndUpdate(
            { _id: `${req.params.id}`},
            params,
            { new: true }
        )
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(404).send();
        })
    })
    .delete((req, res) => {
        console.log(`DELETE /students/${req.params.id}`);
        Student.findOneAndDelete({ _id: `${req.params.id}` })
            .then(data => {
                res.status(200).send();
            })
            .catch(err => {
                res.status(404).send()
            })
    });

router.route("/students/:id/sessions")
    .get((req, res) => {
        console.log(`GET /students/${req.params.id}/sessions`);
        Session.find({ students: `${req.params.id}` })
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(404).send();
            })
    });

router.route("/instructors")
    .get((req, res) => {
        console.log("GET /instructors");
        Instructor.find({})
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    })
    .post((req, res) => {
        console.log("POST /instructors");
        let params = {
            name: req.body.name,
            usrname: req.body.usrname,
            pswrd: req.body.pswrd
        };
        for(let prop in params) if(!params[prop]) delete params[prop];
        var size = Object.keys(params).length;
        if (size < 3) {
            res.status(500).send();
        } else {
            Instructor.create(params).save()
                .then(data => {
                    res.status(201).send(data);
                })
                .catch(err => {
                    res.status(404).send();
                })
        }
    });

router.route("/instructors/:id")
    .get((req, res) => {
        console.log(`GET /instructors/${req.params.id}`);
        Instructor.findById(`${req.params.id}`)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(404).send();
            })
    })
    .patch((req, res) => {
        console.log(`PATCH /instructors/${req.params.id}`);
        let params = {
            name: req.body.name
        };
        for(let prop in params) if(!params[prop]) delete params[prop];
        Instructor.findOneAndUpdate(
            { _id: `${req.params.id}`},
            params,
            { new: true }
        )
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(404).send();
        })
    })
    .delete((req, res) => {
        console.log(`DELETE /instructors/${req.params.id}`);
        Instructor.findOneAndDelete({ _id: `${req.params.id}` })
            .then(data => {
                res.status(200).send();
            })
            .catch(err => {
                res.status(404).send()
            })
    });

router.route("/instructors/:id/sessions")
    .get((req, res) => {
        console.log(`GET /students/${req.params.id}/sessions`);
        Session.find({ instructor: `${req.params.id}` })
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(404).send();
            })
    });

router.route("/sessions")
    .get((req, res) => {
        console.log("GET /sessions");
        Session.find({})
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    })
    .post((req, res) => {
        console.log("POST /sessions");
        let params = {
            instructor: req.body.instructor,
            students: req.body.students,
            capacity: req.body.capacity,
            day: req.body.day
        };
        for(let prop in params) if(!params[prop]) delete params[prop];
        var size = Object.keys(params).length;
        if (size < 2) {
            res.status(500).send();
        } else {
            Session.create(params).save()
                .then(data => {
                    res.status(201).send(data);
                })
                .catch(err => {
                    res.status(404).send();
                })
        }
    });

router.route("/sessions/:id")
    .get((req, res) => {
        console.log(`GET /sessions/${req.params.id}`);
        Session.findById(`${req.params.id}`)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(404).send();
            })
    })
    .patch((req, res) => {
        console.log(`PATCH /sessions/${req.params.id}`);
        let params = {
            instructor: req.body.instructor,
            students: req.body.students,
            capacity: req.body.capacity,
            day: req.body.day
        };
        for(let prop in params) if(!params[prop]) delete params[prop];
        Session.findOneAndUpdate(
            { _id: `${req.params.id}`},
            params,
            { new: true }
        )
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(404).send();
        })
    })
    .delete((req, res) => {
        console.log(`DELETE /sessions/${req.params.id}`);
        Session.findOneAndDelete({ _id: `${req.params.id}` })
            .then(data => {
                res.status(200).send();
            })
            .catch(err => {
                res.status(404).send()
            })
    });

module.exports = router;