const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};

//var fs = require('fs');

//var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

// render travelList
const renderTravelList = (req, res, responseBody) => {
    let message = null;
    let pageTitle = process.env.npm_package_description + ' - Travel';
    
    //if response body is not in an array, we set the responseBody to be an empty array
    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = 'No trips exist in our database!';
        }
    }
    res.render('travel',
    {
        title: pageTitle,
        trips: responseBody,
        message
    });
};

/* GET travel view */
const travelList = (req, res) => {
    const path = '/api/trips';
    const requestOptions = { //declare request options
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };

    //console for debugging
    console.info('>> travelController.travelList calling ' + requestOptions.url);

    //request object to pass in options and errors(if applicable)
    request(
        requestOptions,
        (err, { statusCode }, body) => {
            if (err) {
                console.error(err);
            }
            renderTravelList(req, res, body);
        }
    );
};

module.exports = {
    travelList
};