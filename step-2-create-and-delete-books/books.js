/*
   Copyright 2016, Google, Inc.
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

var url = require('url');

module.exports = function(config) {

  var gcloud = require('google-cloud');

  var datastore = gcloud.datastore({
    projectId: config.projectId,
    keyFilename: config.keyFilename
  });

  getAllBooks = (callback) => {
    var query = datastore.createQuery(['Book']);
    datastore.runQuery(query, (err, books) => callback(err, books, datastore.KEY));
  }

  getUserBooks = (userId, callback) =>{
    callback(new Error('books.getUserBooks [Not Yet Implemented]'));
  }

  addBook = (title, author, coverImageData, userId, callback) => {
    if (coverImageData)
      return callback(new Error("books.addBook image saving Not Yet Implemented"));

    var entity = {
      key: datastore.key('Book'),
      data: {
        title: title,
        author: author
      }
    };

    datastore.save(entity, callback);
  }

  deleteBook = (bookId, callback) => {
    var key = datastore.key(['Book', parseInt(bookId, 10)]);
    datastore.delete(key, callback);
  }

  return {
    getAllBooks,
    getUserBooks,
    addBook,
    deleteBook
  };
};
