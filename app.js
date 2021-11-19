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

app.listen(4000);