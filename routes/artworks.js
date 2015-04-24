exports.register = function(server, option, next) {
  server.route([
    {
      // Retrieve all artworks
      method: 'GET',
      path: '/artworks',
      handler: function(request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;

        db.collection('artworks').find().toArray(function(err, artworks) {
          if (err) { return reply('Internal MongoDB error', err); }

          reply(artworks);
        });
      }
    },
    {
      // Retrieve a specific artwork
      method: 'GET',
      path: '/artworks/{id}',
      handler: function(request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;
        var artworkId = encodeURIComponent(request.params.id);
        var ObjectId = request.server.plugins['hapi-mongodb'].ObjectID;

        db.collection('artworks').findOne({ "_id": ObjectId(artworkId) }, function(err, artwork) {
          if (err) { return reply('Internal MongoDB error', err); }

          reply(artwork);
        })
      }
    },
    {
      // Retrieve all artworks by a specific artist
      method: 'GET',
      path: '/artworks/artist/{id}',
      handler: function(request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;
        var artistId = encodeURIComponent(request.params.id);
        var ObjectId = request.server.plugins['hapi-mongodb'].ObjectID;

          db.collection('artworks').find({ "artist_id": ObjectId(artistId) }).toArray(function(err, artworks) {
            if (err) { return reply('Internal MongoDB error', err); }

            reply(artworks);
          });
        
      }
    },
    {
      // Create a new artwork ** remember to add logic where new artist is ceated if doesn't exist
      method: 'POST',
      path: '/artworks',
      
      handler: function(request, reply) {
        // first authenticate the admin
        // Auth.authenticated(request, function(result){
        //   if(result.admin) {
            // post the artwork
            var db = request.server.plugins['hapi-mongodb'].db;
            var ObjectId = request.server.plugins['hapi-mongodb'].ObjectID;

            db.collection('artists').findOne({ "name": request.payload.artwork.artist }, function(err, artist) {
              if (err) { return reply('Internal MongoDB error', err); }
              if (artist === null) { return reply('Could not find matching artist'); } // add code for creating new artist here if needed
              var artwork = request.payload.artwork;

              artwork['artist_id'] = artist._id;

              db.collection('artworks').insert( artwork, function(err, writeResult){
                if(err) {
                  return reply('Internal MongoDB error', err);
                } else {
                  reply(writeResult);
                }
              });
            });
          // } else {
          //   // reply that admin is not authenticated
          //   reply(result);
          // }
        // });
      }
    },
    {
      // Delete an artwork
      method: 'DELETE',
      path: '/artworks/{id}',
      handler: function(request, reply) {
        // Auth.authenticated(request, function(result){
        //   if(result.admin) {
            // delete the artwork
            var db = request.server.plugins['hapi-mongodb'].db;
            var artworkId = encodeURIComponent(request.params.id);
            var ObjectId = request.server.plugins['hapi-mongodb'].ObjectID;

            db.collection('artworks').remove({ "_id": ObjectId(artworkId) }, function(err, artwork) {
              if (err) { return reply('Internal MongoDB error', err); }

              reply(artwork);
            });
          // } else {
          //   // reply that admin is not authenticated
          //   reply(result);
          // }
        // });
      }
    },
    {
      // Edit an artwork
      method: 'PUT',
      path: '/artworks/{id}',
      handler: function(request, reply) {
        // Auth.authenticated(request, function(result){
        //   if(result.admin) {
            // edit the artwork
            var db = request.server.plugins['hapi-mongodb'].db;
            var artworkId = encodeURIComponent(request.params.id);
            var ObjectId = request.server.plugins['hapi-mongodb'].ObjectID;
            var modArtwork = request.payload.artwork;

            db.collection('artworks').findOne({ "_id": ObjectId(artworkId) }, function(err, mongoArtwork) {
              if (err) { return reply('Internal MongoDB error', err); }
              var newArtist = request.payload.artwork.artist;

              if (newArtist != null && newArtist != mongoArtwork.artist) {

                db.collection('artists').findOne({ "name": newArtist }, function(err, artist) {
                  if (err) { return reply('Cannot find artist', err); }

                  modArtwork['artist_id'] = artist._id;
                  db.collection('artworks').update({ "_id": ObjectId(artworkId) }, { '$set': modArtwork }, function(err, artwork) {
                    if (err) { return reply('Internal MongoDB error', err); }

                    reply(artwork);
                  });
                });
              } else {
                db.collection('artworks').update({ "_id": ObjectId(artworkId) }, { '$set': modArtwork }, function(err, artwork) {
                  if (err) { return reply('Internal MongoDB error', err); }

                  reply(artwork);
                });
              };
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
  name: 'artworks-route',
  version: '0.0.1'
};