var user = {
    _id : undefined,
    name : undefined
};

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
                    done();
                } else {

                    console.log(response);

                    if(response.results.length === 0) {
                        console.log("no user found");

                        //Create User
                        var query = gremlin();
                        query(g.addVertex({twitterid:profile.id, type: "User", twitterdata: profile}));
                        client.execute(query, function(err, response) {
                           if(err) {
                               console.log(err);
                               done();
                           } else {
                               console.log(response);
                               var user = {
                                   id : response.results[0]._id,
                                   name : profile.displayName
                               }
                               done(null, user);
                           }
                        });
                    } else {
                        console.log("user found");
                        var query = gremlin();
                        //Update User
                        var id = response.results[0]._id;
                        console.log("id:"+id);
                        query(g.v(id).setProperty("twitterdata", profile));
                        client.execute(query, function(err, response) {
                            if(err) {
                                console.log(err);
                                done();
                            } else {
                                console.log(response);
                                var user = {
                                    id : id,
                                    name : profile.displayName
                                }
                                done(null,user);
                            }
                        });

                    }
                }

            })
        },

        findById: function(id, callback){

            console.log("findById");
            var client = grex.createClient(grexOptions);
            var gremlin = grex.gremlin;
            var g = grex.g;
            var query = gremlin();
            query(g.v(id));

            client.execute(query, function(err, response) {
                if(err) {
                    console.log(err);
                    callback(err, null);
                } else {

                    console.log(response);
                    var user = {
                        id : id,
                        name : response.results[0].twitterdata.displayName
                    }
                    callback(err, user);
                }

            })
        }
    };
};
