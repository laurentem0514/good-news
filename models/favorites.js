//code accredited to Rafa Pacas from itunes crud lab

const { ObjectID } = require('mongodb');
const { getDB }    = require('../lib/dbConnect.js');


//saves favorite to collection in db
 function saveFavorites(req, res, next) {
  getDB().then((db, err) => {
   if (err) return next(err);
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

//retrieves collection of favorites for a user from db for display
 function getFavorites(req, res, next) {
  let userId = res.user._id || -1;
  getDB().then((db, err) => {
    if (err) return next(err);
    db.collection('favorites')
      .find({ "userId": userId.toString() })
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

//will delete document from collection
 function deleteFavorite(req, res, next) {
  getDB().then((db, err) => {
    if (err) return next(err);

    db.collection('favorites')
      .remove({ _id: ObjectID(req.params.id) }, (removeErr, doc) => {
        if (removeErr) return next(removeErr);

        res.removed = doc;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}


module.exports = {
  saveFavorites,
  getFavorites,
  deleteFavorite,
 };
