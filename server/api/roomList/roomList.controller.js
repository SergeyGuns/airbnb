'use strict';

var _ = require('lodash');
var mongo = require('mongodb');
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';

// Get list of rooms
exports.index = function(req, res) {

    // console.log(req.body);
    mongo.Db.connect(mongoUri, function(err, db) {
        db.collection('roomsCollection', function(er, collection) {

            var page = parseInt(req.body.page);
            var size = parseInt(req.body.count);
            var skip = page > 0 ? ((page - 1) * size) : 0;
            var sorting = req.body.sorting;
            var key;
            for (var prop in sorting) {
                key = prop;
            }
            if (sorting[key] === 'asc')
                sorting[key] = 1;
            else
                sorting[key] = -1;

            // console.log(sorting);
            collection.count(function(cntErr, count) {

                // console.log(count);

                collection.find().sort(sorting).skip(skip)
                    .limit(size, function(err, cursor) {

                        cursor.toArray(function(error, docs) {
                            if (error)
                                console.log(error);

                            res.send({
                                rooms: docs,
                                total: count
                            });

                        });
                    });




            });




        });
    });
};