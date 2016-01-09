/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {

    if(req.user) {
        res.json({
            name: req.user.name
        });
    } else {
        res.json({
            name: "World"
        });
    }

};