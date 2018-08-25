const rl = require('readline');
// DB Connection
const db = require('./connection');
// Schemas
const User = require('./schemas/User');
const Tweet = require('./schemas/Tweet');

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

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection success!');

    console.log('Ingresa alguna de las siguientes letras para realizar alguna acción:');
    console.log('u - Crear usuario');
    console.log('t - Crear tweet');
    console.log('v - Ver tweets');
    ask('\nAcción:', function(answer) {
        console.log('Respuesta:', answer, '\n');
        switch (answer) {
            case 'u':
                const newUser = new User({
                    username: 'john',
                    email: 'john@bonachon.com',
                    password: '123456',
                    address: {
                        street: 'Avenida siempre viva',
                        number: 123,
                        pc: 14250
                    }
                });
                newUser.save(function (error) {
                    if (error) console.log('error:', error);
                    console.log('Se ha guardado el usuario!');
                });
                break;
            case 't':
                const newTweet = new Tweet({
                    author: 'citlali',
                    tweet: 'Lorem ipsum dolor',
                    date: new Date(),
                    mentions: ['StgoSm']
                });
                newTweet.save(function (error) {
                    if (error) console.log('error:', error);
                    console.log('Se ha guardado el Tweet!');
                });
                break;
            case 'v':
                Tweet.find({}, function(error, response) {
                    if (error) console.log('error:', error);
                    console.log('Listado de Tweets:');
                    response.forEach(function(value, index) {
                        console.log(`Tweet ${index}:`);
                        console.log('  * _id:', value._id);
                        console.log('  * author:', value.author);
                        console.log('  * tweet:', value.tweet);
                        console.log('  * date:', value.date);
                        console.log('\n');
                    });
                });
                break;
        } 
    });
});
// db.close();
