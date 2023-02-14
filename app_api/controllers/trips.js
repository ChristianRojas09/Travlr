const mongoose = require('mongoose'); //.set('debug', true);
const Model = mongoose.model('trips'); //import mongoose db library to schema

//GET method: /trips - list all trips
const tripsList = async (req, res) => {
    Model
        .find({}) // empty filter for all
        .exec((err, trips) => {
            if (!trips) {
                return res
                    .status(404)
                    .json({"message" : "trips not found"});
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trips);
            }
        });
};

//GET: /trips/:tripCode - return a single trip
const tripsFindCode = async (req, res) => {
    Model
        .find({'code': req.params.tripCode})
        .exec((err, trip) => {
            if(!trip) {
                return res
                    .status(404)
                    .json({"message" : "trips not found"});
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trip);
            }
        });
    };

    const tripsAddTrip = async (req, res) => {
        Trip
            .create({
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            (err, trip) => {
                if(err) {
                    return res 
                        .status(400) //bad request, invalid content
                        .json(err);
                } else {
                    return res
                        .status(201)
                        .json(trip);
                }
            });
    }   
module.exports = {
    tripsList,
    tripsFindCode,
    tripsAddTrip
};