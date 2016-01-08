var path = require("path");

exports.index = function(req, res){
    res.render('index');
};

exports.ping = function(req, res){
    res.status(200).json({"ping":"pong!"});
};

exports.partials = function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
};