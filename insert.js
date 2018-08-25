const mongoClient = require('mongodb').MongoClient;
const rl = require('readline');

const url = 'mongodb://localhost:27017';
const dbName = 'foo-bar';
const TWEETS_COLLECTION = 'tweets';
const USERS_COLLECTION = 'users';

const ask = function(question, callback) {
    var r = rl.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    r.question(question + '\n', function(answer) {
      r.close();
      callback(answer);
    });
};

ask('Ingresa el nombre del autor:', function(authorName) {
    console.log('Nombre:', authorName, '\n');

    ask('Ingresa el texto del tweet:', function(text) {
        console.log('Texto:', text, '\n');

        mongoClient.connect(url, function(error, client) {
            if (error) console.log('error:', error);
            console.log('Conexión exitosa!\n');
            const db = client.db(dbName); // use foo-bar;

            const tweetDate = new Date();

            db.collection(TWEETS_COLLECTION).insert({
                author: authorName,
                tweet: text,
                date: tweetDate,
            });

            db.collection(TWEETS_COLLECTION).find({author: authorName}).project({'_id': false, 'author': true}).toArray(function(error, result) {
                if (error) console.log('error:', error);
                console.log('result:', result);
            });
            client.close();
        });
    });
});
