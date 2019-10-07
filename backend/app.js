const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// app.use((req, res) => {
//    res.json({ message: 'Your request was successful!' });
// });


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

// Make sure you place the POST route above the middleware for GET requests, as the GET logic will currently intercept
// all requests to your  /api/stuff  endpoint — placing the POST route beforehand
// will intercept POST requests, preventing them from reaching the GET middleware.

app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    //request will time-out if we don't send a request
    res.status(201).json({
        message: "Thing created successfully"
    });
});


app.use('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: 'oeihfzeoi',
            title: 'My first thing',
            description: 'All of the info about my first thing',
            imageUrl: 'https://picsum.photos/id/237/200/300',
            price: 4900,
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'My second thing',
            description: 'All of the info about my second thing',
            imageUrl: 'https://picsum.photos/seed/picsum/200/300',
            price: 2900,
            userId: 'qsomihvqios',
        },
    ];
    res.status(200).json(stuff);
});

module.exports = app;
