exports.register = function(server, option, next) {
  server.route([
    {
      // Retrieve all artworks
      method: 'GET',
      path: '/featuredArtworks',
      handler: function(request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;

        db.collection('featuredArtworks').find().toArray(function(err, artworks) {
          if (err) { return reply('Internal MongoDB error', err); }
          var query = [];
          artworks.forEach(function(index){
            query.push({"_id": index.artwork_id});
          });
          // reply(query);
          db.collection('artworks').find({$or: query}).toArray(function(err, response) {
            if (err) { return reply('Internal MongoDB error', err); }
            reply(response);
          });
        });
      }
    },
    {
      // Create a new artwork ** remember to add logic where new artist is ceated if doesn't exist
      method: 'POST',
      path: '/featuredArtworks',
      
      handler: function(request, reply) {
        // first authenticate the admin
        // Auth.authenticated(request, function(result){
        //   if(result.admin) {
            // post the artwork
            var db = request.server.plugins['hapi-mongodb'].db;
            var ObjectId = request.server.plugins['hapi-mongodb'].ObjectID;
            var artwork = request.payload.artwork;
            artwork.artwork_id = ObjectId(request.payload.artwork.artwork_id);

            db.collection('artworks').findOne(artwork.artwork_id, function(err, response) {
              if (err) { return reply('Internal MongoDB error', err); }
              if (response === null) { return reply('Could not find matching artwork'); }
              db.collection('featuredArtworks').insert( artwork, function(err, writeResult){
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
      path: '/featuredArtworks/{id}',
      handler: function(request, reply) {
        // Auth.authenticated(request, function(result){
        //   if(result.admin) {
            // delete the artwork
            var db = request.server.plugins['hapi-mongodb'].db;
            var artworkId = encodeURIComponent(request.params.id);
            var ObjectId = request.server.plugins['hapi-mongodb'].ObjectID;

            db.collection('featuredArtworks').remove({ "artwork_id": ObjectId(artworkId) }, function(err, artwork) {
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
      path: '/featuredArtworks/{id}',
      handler: function(request, reply) {
        // Auth.authenticated(request, function(result){
        //   if(result.admin) {
            // edit the artwork
            var db = request.server.plugins['hapi-mongodb'].db;
            var artworkId = encodeURIComponent(request.params.id);
            var ObjectId = request.server.plugins['hapi-mongodb'].ObjectID;
            var modArtwork = request.payload.artwork;

            db.collection('featuredArtworks').update({ "artwork_id": ObjectId(artworkId) }, { '$set': modArtwork }, function(err, artwork) {
              if (err) { return reply('Internal MongoDB error', err); }

              reply(artwork);
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
  name: 'featuredArtwork-route',
  version: '0.0.1'
};