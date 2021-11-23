const express = require('express');
const app = express();

const data = require('./data.json');

/*
    Setting view engine
*/
app.set('view engine', 'pug');


/*
    Middleware
*/
app.use('/static', express.static('public'));


/*
    Routes
*/
app.get('/', (req, res) => {
    const projects = data.projects;
    res.locals.data = data.projects;
    res.render('index', { projects } );
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/projects/:id', (req, res, next) => {
    const projectID = req.params.id;
    const projectMatch = data.projects[projectID]

    if(projectMatch) {
        res.render('project', { projectMatch })
    } else {
        const err = new Error('Page was not found')
        err.status = 404;
        next(err);
    }
});

app.get('/project/:id', (req, res, next) => {
    const projectID = req.params.id;
    const projectMatch = data.projects[projectID]

    if(projectMatch) {
        res.render('project', { projectMatch })
    } else {
        const err = new Error('Page was not found')
        err.status = 404;
        next(err)
    }
});

/*
    404 Error Handler
*/
app.use((req, res, next) => {
    const err = new Error('This Page has not been found');
    err.status = 404;
    next(err);
});

/*
    Global Error Handler
*/
app.use((err, req, res, next) => {
    if(err.status === 404) {
        err.message = `Apologies, a (${err.status}) error occurred`
        console.log(`Looks like you have encountered a ${err.status} error - please ensure your URL is correct to help debug please refer to: ${err.stack}`);
        res.send(`${err.message}`);
    } else {
        err.message = err.message || 'Looks like there was a server error, sorry!'
        res.status(err.status || 500);
        console.log(`Looks like you have encountered a ${err.status} error - to help debug please refer to: ${err.stack}`);
        res.send(`Error Code: ${res.status} : ${err.message}`);
    }
});

app.listen(4000);