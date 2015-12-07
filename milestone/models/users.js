var ObjectId = require('mongodb').ObjectId
var assert = require('assert')
var db = require('../db')

exports.insert = function(user, callback) {
  // Get the users collection
  var collection = db.get().collection('users')
  // Insert a user
  collection.insert(user, function(err, result) {
    assert.equal(err, null)
    assert.equal(1, result.result.n)
    assert.equal(1, result.ops.length)
    console.log('Inserted 1 document into the users collection')
    callback(result)
  })
}

exports.find = function(id, callback) {
  // Get the users collection
  var collection = db.get().collection('users')
  // Find a user
  collection.findOne({'_id': ObjectId(id)}, function(err, document) {
    assert.equal(err, null)
    console.log('Found 1 user document')
    callback(document)
  })
}

exports.update = function(user, callback) {
  // Get the users collection
  var collection = db.get().collection('users')
  user._id = ObjectId(user._id)
  // Update the user
  collection.update({'_id': user._id}, user, function(err, result) {
    assert.equal(err, null)
    assert.equal(1, result.result.n)
    console.log('Updated 1 document in the users collection')
    callback()
  })
}

exports.addSavedSearch = function(userId, savedSearch, callback) {
  // Get the users collection
  var collection = db.get().collection('users')
  // Add the tag
  collection.update(
    {'_id': ObjectId(userId)},
    { $push: { savedSearches: savedSearch }},
    function(err, result) {
      assert.equal(err, null)
      assert.equal(1, result.result.n)
      console.log('Added 1 tag to a document in the users collection')
      callback()
    }
  )
}

exports.removeSavedSearch = function(userId, savedSearch, callback) {
  // Get the users collection
  var collection = db.get().collection('users')
  // Add the tag
  collection.update(
    {'_id': ObjectId(userId)},
    { $pull: { savedSearches: savedSearch }},
    function(err, result) {
      assert.equal(err, null)
      assert.equal(1, result.result.n)
      console.log('Added 1 tag to a document in the users collection')
      callback()
    }
  )
}
