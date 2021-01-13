// Build an Express server with a GET endpoint / apps
// By default return the complete list of apps in the array.
// The endpoint accepts the following optional query parameters:

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('dev'))
    .use(cors());

const playstore = require('./playstore/playstore');

app.get('/apps', (req, res) => {

const { sort, genres } = req.query;
    
let results = playstore


    if(sort) {
        if (!['rating', 'app'].includes(sort)) {
            return res
            .status(400)
            .send('Sort must be one of rating or app');
        }
    }

    if(sort === 'rating'){
        results = results.sort((a,b) => {
            return a['Rating'] > b['Rating'] ? 1 : a['Rating'] < b['Rating'] ? -1 : 0;
        });
    }

    if(sort === 'app'){
        results = results.sort((a,b) => {

            let item1 = a['App'].toLowerCase();
            let item2 = b['App'].toLowerCase();

            return item1 > item2 ? 1 : item1 < item2 ? -1 : 0;
        });
    }

    if (genres) {
        if (!['Action', 
        'Puzzle', 
        'Strategy', 
        'Casual', 
        'Arcade', 
        'Card']
        .includes(genres)){
            return res
            .status(400)
            .send('Genres must be Action, Puzzle, Strategy, Casual, Arcade, or Card')
        }
    }

    if (genres) {
        results = results.filter ( app => {
                let appGenre1 = app.Genres.toLowerCase();

                return appGenre1 === genres.toLowerCase();
            })
    }
    return res.send(results);
});



app.listen(8000, () => {
    console.log('Server started on Port 8000');
});