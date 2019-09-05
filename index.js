/*
//RS IMPLEMENTATION WITH ADDITIONAL COMMENTS
const functions = require('firebase-functions');

//Set up database connection
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
//Notes:
//  helloWorld is the name of the function
//  

//Added security (added in Youtube video after week 1)
//change default CORS policy
//allow calls to this API from any origin
const cors = require('cors')({ origin: true});
// allow calls to this API only from example.com
//const cors = require('cors')({origin: 'http://example.com'});

exports.helloWorld = functions.https.onRequest((request, response) => {

    //Added security see comments above
    //wrap main logic in cors middleware
    cors(reqest, response, () => {


    // Just adding some fake data in JSON format:
        //let data = { name: "Joe", age: 23, isMember: true}; 
        

        //assumes a collection in your Cloud Firestore named 'quiz'; edit accordingly
        //preferably there's also some data there, i.e. documents in the collection
        db.collection('quiz').get()
        .then( result => {
            let data = [];
            result.forEach( doc => {
                data.push(doc.data() );
            });
        
            //response.send("Hello from Firebase!");

            response.json(data);
            response.send();
            //return data;
        })
        .catch( err => {
            //console.error(error);
            //response.error(500);
            response.json({ success:false, error:err});
            response.send();
        });
    //  response.send("Hello from Firebase!");
    }); //cors

 }); //getData function
*/

//IMPLEMENTATION FROM L CARBONARO'S GITHUB REPO
const functions = require('firebase-functions');

// set up database connection
const admin = require('firebase-admin');
admin.initializeApp( functions.config().firebase);
const db = admin.firestore();

// change default CORS policy
// allow calls to this API from any origin
const cors = require('cors')({ origin: true });  
// allow calls to this API only from example.com
//const cors = require('cors')({ origin: 'http://example.com' });  

exports.helloWorld = functions.https.onRequest((req, res) => {

    // wrap main logic in cors middleware
    cors(req, res, () => {

        // assumes a collection in your Cloud Firestore named 'quiz'; edit accordingly
        // preferably there's also some data there, i.e. documents in the collection
        db.collection('quiz').get()
        .then( result => {
            let data = [];
            result.forEach( doc => {
                data.push(doc.data());
            });
            res.json(data);
            res.send();
        })
        .catch( err => {
            res.json({ success:false, error:err });
            res.send();
        });
        
    });  // cors 

});  // getData function
