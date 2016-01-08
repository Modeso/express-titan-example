
module.exports = function(grex, grexOptions) {
    return {
        findOrCreateUsingTwitter: function(profile, done){

            var client = grex.createClient(grexOptions);
            var gremlin = grex.gremlin;
            var g = grex.g;
            var query = gremlin();
            query(g.V().has("twitterid", profile.id));

            client.execute(query, function(err, response) {
                if(err) {
                    console.log(err);
                } else {

                    console.log(response);

                    if(response.results.length === 0) {
                        console.log("no user found");

                        //Create User
                        var query = gremlin();
                        query(g.addVertex({twitterid:profile.id, type: "User"}));
                        client.execute(query, function(err, response) {
                           if(err) {
                               console.log(err);
                           } else {
                               console.log(response);
                               done(response.results);
                           }
                        });
                    } else {
                        console.log("user found");
                        done(response.results);
                    }
                }
                done();
            })
        }
    };
};
