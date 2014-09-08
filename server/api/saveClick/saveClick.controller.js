'use strict';

var _ = require('lodash');
var mongo = require('mongodb');
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';

// Get list of saveClicks
exports.index = function(req, res) {

    mongo.Db.connect(mongoUri, function(err, db) {
        if (err)
            console.log(err);
        db.collection('clicks', function(er, collection) {
            if (er)
                console.log(er);

            console.log(req.body);

            collection.insert(req.body, function(erro, obj) {
                if (erro)
                    console.log(erro);

                console.log(obj);
                res.json([]);
                db.close();
            });

        });
    });

};