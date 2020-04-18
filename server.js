//defining variables for express, path
const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 5000;

const bodyParser = require('body-parser')
const request = require('request')

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

//defining the path to launch the site from

app.use(express.static(path.resolve('./client/build')))

//defining the file that will be launched when site is visited

app.get('*', (req, res) => {
    res.sendFile(path.resolve('./client/build/index.html'))
})

// Signup Route
app.post('/signup', (req, res) => {
    const { firstName, lastName, email } = req.body;

    //Make sure fields are filled
    if (!firstName || !lastName || !email) {
        res.redirect('/fail.html');
        return;
    }

    //Construct req data
    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const postData = JSON.stringify(data);

    const options = {
        url: 'https://us2.api.mailchimp.com/3.0/lists/5bd147b87f',
        method: 'POST',
        headers: {
            Authorization: 'auth 7bd8ed93ac46a6d900fe2fd177dcdb0a-us2'
        },
        body: postData
    };

    request(options, (err, response, body) => {
        if (err) {
            res.redirect('/fail.html');
        } else {
            if (response.statusCode === 200) {
                res.redirect('/success.html');
            } else {
                res.redirect('/fail.html');
            }
        }
    });
})

//telling it to listen for this port

app.listen(port, () => {
    console.log('Listening on port: ', port)
})
