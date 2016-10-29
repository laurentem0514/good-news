const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');

// do your db stuff here
const dbConnection = 'mongodb://localhost:27017/newsSources';

//
 function saveFavorites(req, res, next) {
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next(err);
    console.log('favorite is: ', req.body.favorite);
    db.collection('favorites')
      .insert(req.body.favorite, (insertErr, result) =>{
        if (insertErr) return next(insertErr);

        res.saved = result;
        db.close();
        return next();
      });
    return false;
  });
  return false;
 }


 function getFavorite(req, res, next) {
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next(err);

    db.collection('favorites')
      .find({})
      .sort({ Title: 1 })
      .toArray((arrayError, data) => {
        if (arrayError) return next(arrayError);

        // return the data
        res.favorites = data;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}


//  function deleteFavorite(req, res, next) {
//   MongoClient.connect(dbConnection, (err, db) => {
//     if (err) return next(err);

//     db.collection('favorites')
//       .findAndRemove({ _id: ObjectID(req.params.id) }, (removeErr, doc) => {
//         if (removeErr) return next(removeErr);

//         res.removed = doc;
//         db.close();
//         return next();
//       });
//     return false;
//   });
//   return false;
// }


module.exports = {
  saveFavorites,
  getFavorite,
 // deleteFavorite,
 };
