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
        res.status(200).send({
            data: "App is running."
        });
    });
    
router.route("/students")
    .get((req, res) => {
        Student.find({})
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    })
    .post((req, res) => {
        let params = {
            name: req.body.name,
            usrname: req.body.usrname,
            pswrd: req.body.pswrd,
            type: req.body.type
        };
        for(let prop in params) if(!params[prop]) delete params[prop];
        var size = Object.keys(params).length;
        if (size < 4) {
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

router.route("/students/:un&:pw")
    .get((req, res) => {
        Student.findOne({ $and: [{usrname: {$eq: `${req.params.un}`}}, {pswrd: {$eq: `${req.params.pw}`}}] })
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(404).send();
            })
    })

router.route("/students/:id")
    .get((req, res) => {
        Student.findById(`${req.params.id}`)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(404).send();
            })
    })
    .patch((req, res) => {
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
        Session.find({ students: `${req.params.id}` })
            .sort('day')
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(404).send();
            })
    });

router.route("/students/:id/availablesessions")
    .get((req, res) => {
        Session.find({$and: [{students: {$ne: `${req.params.id}`} },
                             {full: {$ne: true}}]
                     })
            .sort('day')
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(404).send();
            })
    });

router.route("/instructors")
    .get((req, res) => {
        Instructor.find({})
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    })
    .post((req, res) => {
        let params = {
            name: req.body.name,
            usrname: req.body.usrname,
            pswrd: req.body.pswrd,
            type: req.body.type
        };
        for(let prop in params) if(!params[prop]) delete params[prop];
        var size = Object.keys(params).length;
        if (size < 4) {
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

router.route("/instructors/:un&:pw")
    .get((req, res) => {
        Instructor.findOne({ $and: [{usrname: {$eq: `${req.params.un}`}}, {pswrd: {$eq: `${req.params.pw}`}}] })
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(404).send();
            })
    });

router.route("/instructors/:id")
    .get((req, res) => {
        Instructor.findById(`${req.params.id}`)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(404).send();
            })
    })
    .patch((req, res) => {
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
        Session.find({ instructor: `${req.params.id}` })
            .sort('day')
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(404).send();
            })
    });

router.route("/sessions")
    .get((req, res) => {
        Session.find({})
            .sort('day')
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    })
    .post((req, res) => {
        let params = {
            instructor: req.body.instructor,
            students: req.body.students,
            capacity: req.body.capacity,
            full: req.body.full,
            day: req.body.day
        };
        for(let prop in params) if(!params[prop] && prop !== "full") delete params[prop];
        var size = Object.keys(params).length;
        if (size < 2) {
            res.status(500).send();
        } else {
            Session.create(params).save()
                .then(data => {
                    res.status(201).send(data);
                })
                .catch(err => {
                    console.log(err);
                    res.status(404).send();
                })
        }
    });

router.route("/sessions/:id")
    .get((req, res) => {
        Session.findById(`${req.params.id}`)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(404).send();
            })
    })
    .patch((req, res) => {
        let params = {
            instructor: req.body.instructor,
            students: req.body.students,
            capacity: req.body.capacity,
            full: req.body.full,
            day: req.body.day
        };
        for(let prop in params) if(!params[prop] && prop !== "full") delete params[prop];
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
        Session.findOneAndDelete({ _id: `${req.params.id}` })
            .then(data => {
                res.status(200).send();
            })
            .catch(err => {
                res.status(404).send()
            })
    });

module.exports = router;