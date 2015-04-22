exports.register = function(server, option, next) {
  server.route([
    {
      // Retrieve all artists
      method: 'GET',
      path: '/artists',
      handler: function(request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;

        db.collection('artists').find().toArray(function(err, artists) {
          if (err) { return reply('Internal MongoDB error', err); }

          reply(artists);
        });
      }
    },
    {
      // Retrieve a specific artist
      method: 'GET',
      path: '/artists/{id}',
      handler: function(request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;
        var artistId = encodeURIComponent(request.params.id);
        var ObjectId = request.server.plugins['hapi-mongodb'].ObjectID;

        db.collection('artists').findOne({ "_id": ObjectId(artistId) }, function(err, artist) {
          if (err) { return reply('Internal MongoDB error', err); }

          reply(artist);
        })
      }
    },
    {
      // Create a new artist
      method: 'POST',
      path: '/artists',
      
      handler: function(request, reply) {
        // first authenticate the admin
        // Auth.authenticated(request, function(result){
        //   if(result.admin) {
            // post the artist
            var db = request.server.plugins['hapi-mongodb'].db;
            var ObjectId = request.server.plugins['hapi-mongodb'].ObjectID;
            var artist = request.payload.artist;

            db.collection('artists').insert( artist, function(err, writeResult){
              if(err) {
                return reply('Internal MongoDB error', err);
              } else {
                reply(writeResult);
              }
            });
          // } else {
          //   // reply that admin is not authenticated
          //   reply(result);
          // }
        // });
      }
    },
    {
      // Edit an artist
      method: 'PUT',
      path: '/artists/{id}',
      handler: function(request, reply) {
        // Auth.authenticated(request, function(result){
        //   if(result.admin) {
            // edit the artwork
            var db = request.server.plugins['hapi-mongodb'].db;
            var artistId = encodeURIComponent(request.params.id);
            var ObjectId = request.server.plugins['hapi-mongodb'].ObjectID;
            var modArtist = request.payload.artist;

            db.collection('artists').update({ "_id": ObjectId(artistId) }, { '$set': modArtist }, function(err, artist) {
              if (err) { return reply('Internal MongoDB error', err); }

              reply(artist);
            });
          // } else {
          //   // reply that admin is not authenticated
          //   reply(result);
          // }
        // });
      }
    },
    {
      // Delete an artist
      method: 'DELETE',
      path: '/artists/{id}',
      handler: function(request, reply) {
        // Auth.authenticated(request, function(result){
        //   if(result.admin) {
            // delete the artwork
            var db = request.server.plugins['hapi-mongodb'].db;
            var artistId = encodeURIComponent(request.params.id);
            var ObjectId = request.server.plugins['hapi-mongodb'].ObjectID;

            db.collection('artists').remove({ "_id": ObjectId(artistId) }, function(err, artist) {
              if (err) { return reply('Internal MongoDB error', err); }

              reply(artist);
            });
          // } else {
          //   // reply that admin is not authenticated
          //   reply(result);
          // }
        // });
      }
    }
  ]);

  next();
};

// give this file some attributes
exports.register.attributes = {
  name: 'artists-route',
  version: '0.0.1'
};