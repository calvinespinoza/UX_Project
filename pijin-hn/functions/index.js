const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require('firebase-admin')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

admin.initializeApp()
const database = admin.database

exports.helloWorld = functions.https.onRequest((request, response) => {

    //Obteniendo las cantidades de msg publicos y privados
    var userId = request.query.text;
    return database().ref('Usuarios').child(userId).child('Amigos').on('value', (snapshot) => {
        var amigos = 0;
        var data = snapshot.val();
        var keys = Object.keys(data);
        for (var i = 0; i < keys.length; i++) {
            amigos++;
        }
        console.log(amigos);

    });
});