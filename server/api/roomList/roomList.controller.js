'use strict';

var _ = require('lodash');
var mongo = require('mongodb');
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';

// Get list of rooms
exports.index = function(req, res) {

    mongo.Db.connect(mongoUri, function(err, db) {
        db.collection('roomsCollection', function(er, collection) {

            collection.find(function(error, cursor) {

                cursor.toArray(function(error, docs) {
                    if (error)
                        console.log(error);

                    res.send({
                        rooms: docs
                    });

                });
            });
        });
    });
};