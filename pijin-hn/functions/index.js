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
    amigos=0;
    var id = request.query.text;
    var friendRef = database().ref().child("Usuarios").child(id).child("Amigos");
    //var exp = document.getElementById("explore-div");

    friendRef.on("value", snap => {
        var friends = snap.val();

        var keys = Object.keys(friends);
        console.log(keys);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            var friendKey = friends[k];
            console.log(friendKey);
            var friendRef = firebase.database().ref().child("Usuarios").child(friendKey);
            friendRef.on("value", snap => {
                amigos++;

                
            })
        }



    })
});