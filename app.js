const express = require('express');
const app = express();

const data = require('./data.json');

// set your “view engine” to “pug”
// Setting view engine
app.set('view engine', 'pug');

// Middleware

// use a static route and the express.static method to serve the static files located in the public folder
app.use('/static', express.static('public'));


// An "index" route (/) to render the "Home" page with the locals set to data.projects CHECK 
app.get('/', (req, res) => {
    res.locals.data = data.projects;
    res.render('index');
});

// An "about" route (/about) to render the "About" page
app.get('/about', (req, res) => {
    res.render('about');
});

// Dynamic "project" routes /projects/:id
// based on the id of the project that render a customized version 
// of the Pug project template to show off each project. Which means adding data, or "locals", as 
// an object that contains data to be passed to the Pug template
app.get('/projects/:id', (req, res) => {
    res.render('project', {
        project: data.projects[req.params.id]
    });
});

// Dynamic "project" routes /project/:id
// based on the id of the project that render a customized version 
// of the Pug project template to show off each project. Which means adding data, or "locals", as 
// an object that contains data to be passed to the Pug template
app.get('/project/:id', (req, res) => {
    res.render('project', {
        project: data.projects[req.params.id].project_name
    });
});

//The 404 handler should create a custom new Error(), set its status property to 404 and set its message 
//property to a user friendly message. Then the 404 handler should log out the new error's message 
//and status properties.

app.use((err, req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404
    err.message = `Sorry, something went wrong - error status: (${err.status}) for further details`
    next(err);
});

//After the 404 handler in app.js add a global error handler that will deal with 
//any server errors the app encounters. This handler should ensure that there is 
//an err.status property and an err.message property if they don't already exist, 
//and then log out the err object's message and status.
app.use((err, req, res, next) => {
    // if(err.status === 404) {
    //     res.message = `Sorry, our site had a (${err.status}) error, for further details:
    //        <br> </br>
    //        <p>${err.stack}</p>`
    //     res.send(res.message);
    // } else {
        err.message = err.message;
        err.status(err.status);
        res.send(`Apologies, this error has occurred: (${err.status}): ${err.message}`)
    // }
});

app.listen(4000);