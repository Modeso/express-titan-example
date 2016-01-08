var path = require("path");

exports.index = function(req, res){
    res.status(200).json({"msg":"Hello World!"});
};

exports.ping = function(req, res){
    res.status(200).json({"ping":"pong!"});
};