"use strict";

const resetDB = require("../config/scripts/populateDB")

const Companion = require("./schema/Companion");
const Doctor = require("./schema/Doctor");

const express = require("express");
const router = express.Router();


// completely resets your database.
// really bad idea irl, but useful for testing
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
    
// ---------------------------------------------------
// Edit below this line
// ---------------------------------------------------
router.route("/doctors")
    .get((req, res) => {
        console.log("GET /doctors");

        // already implemented:
        Doctor.find({})
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    })
    .post((req, res) => {
        console.log("POST /doctors");
        let params = {
            seasons: req.body.seasons,
            name: req.body.name
        };
        for(let prop in params) if(!params[prop]) delete params[prop];
        var size = Object.keys(params).length;
        if (size < 2) {
            res.status(500).send();
        } else {
            Doctor.create(params).save()
                .then(data => {
                    res.status(201).send(data);
                })
                .catch(err => {
                    res.status(404).send();
                })
        }
    });

// optional:
router.route("/doctors/favorites")
    .get((req, res) => {
        console.log(`GET /doctors/favorites`);
        res.status(501).send();
    })
    .post((req, res) => {
        console.log(`POST /doctors/favorites`);
        res.status(501).send();
    });
    
router.route("/doctors/:id")
    .get((req, res) => {
        console.log(`GET /doctors/${req.params.id}`);
        Doctor.findById(`${req.params.id}`)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(404).send();
            })
    })
    .patch((req, res) => {
        console.log(`PATCH /doctors/${req.params.id}`);
        let params = {
            seasons: req.body.seasons,
            name: req.body.name
        };
        for(let prop in params) if(!params[prop]) delete params[prop];
        Doctor.findOneAndUpdate(
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
        console.log(`DELETE /doctors/${req.params.id}`);
        Doctor.findOneAndDelete({ _id: `${req.params.id}` })
            .then(data => {
                res.status(200).send();
            })
            .catch(err => {
                res.status(404).send()
            })
    });
    
router.route("/doctors/:id/companions")
    .get((req, res) => {
        console.log(`GET /doctors/${req.params.id}/companions`);
        Companion.find({ doctors: `${req.params.id}` })
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(404).send();
            })
    });
    

router.route("/doctors/:id/goodparent")
    .get((req, res) => {
        console.log(`GET /doctors/${req.params.id}/goodparent`);
        Doctor.findById(`${req.params.id}`)
            .then(data => {
                Companion.find({ doctors: `${req.params.id}` })
                    .then(data => {
                        var i;
                        for (i = 0; i < data.length; i++) {
                            if (!data[i].alive) {
                                res.status(200).send(false);
                            }
                        }
                        res.status(200).send(true);
                    })
            })
            .catch(err => {
                res.status(404).send();
            })
    });

// optional:
router.route("/doctors/favorites/:doctor_id")
    .delete((req, res) => {
        console.log(`DELETE /doctors/favorites/${req.params.doctor_id}`);
        res.status(501).send();
    });

router.route("/companions")
    .get((req, res) => {
        console.log("GET /companions");
        // already implemented:
        Companion.find({})
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    })
    .post((req, res) => {
        console.log("POST /companions");
        let params = {
            seasons: req.body.seasons,
            name: req.body.name,
            character: req.body.character,
            doctors: req.body.doctors,
            alive: req.body.alive
        };
        for(let prop in params) if(!params[prop]) delete params[prop];
        var size = Object.keys(params).length;
        if (size < 5) {
            res.status(500).send();
        } else {
            Companion.create(params).save()
                .then(data => {
                    res.status(201).send(data);
                })
                .catch(err => {
                    res.status(404).send();
                })
        }
    });

router.route("/companions/crossover")
    .get((req, res) => {
        console.log(`GET /companions/crossover`);
        Companion.find({ doctors: { $not: { $size: 1 } } })
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(404).send();
            })
    });

// optional:
router.route("/companions/favorites")
    .get((req, res) => {
        console.log(`GET /companions/favorites`);
        res.status(501).send();
    })
    .post((req, res) => {
        console.log(`POST /companions/favorites`);
        res.status(501).send();
    })

router.route("/companions/:id")
    .get((req, res) => {
        console.log(`GET /companions/${req.params.id}`);
        Companion.findById(`${req.params.id}`)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(404).send();
            })
    })
    .patch((req, res) => {
        console.log(`PATCH /companions/${req.params.id}`);
        let params = {
            seasons: req.body.seasons,
            name: req.body.name,
            character: req.body.character,
            doctors: req.body.doctors,
            alive: req.body.alive
        };
        for(let prop in params) if(!params[prop]) delete params[prop];
        Companion.findOneAndUpdate(
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
        console.log(`DELETE /companions/${req.params.id}`);
        Companion.findOneAndDelete({ _id: `${req.params.id}` })
            .then(data => {
                res.status(200).send();
            })
            .catch(err => {
                res.status(404).send()
            })
    });

router.route("/companions/:id/doctors")
    .get((req, res) => {
        console.log(`GET /companions/${req.params.id}/doctors`);
        Companion.findById(`${req.params.id}`)
            .then(data => {
                Doctor.find({ _id: { $in: data.doctors } })
                    .then(data => {
                        res.status(200).send(data);
                    })
                    .catch(err => {
                        res.status(404).send();
                    })
            })
            .catch(err => {
                res.status(404).send();
            })
    });

router.route("/companions/:id/friends")
    .get((req, res) => {
        console.log(`GET /companions/${req.params.id}/friends`);
        Companion.findById(`${req.params.id}`)
            .then(data => {
                Companion.find({ seasons: { $in: data.seasons } })
                    .then(data => {
                        var ret = [];
                        var i;
                        for (i = 0; i < data.length; i++) {
                            if (data[i]._id != `${req.params.id}`) {
                                ret.push(data[i]);
                            }
                        }
                        res.status(200).send(ret);
                    })
                    .catch(err => {
                        res.status(404).send();
                    })
            })
            .catch(err => {
                res.status(404).send();
            })
    });

// optional:
router.route("/companions/favorites/:companion_id")
    .delete((req, res) => {
        console.log(`DELETE /companions/favorites/${req.params.companion_id}`);
        res.status(501).send();
    });

module.exports = router;