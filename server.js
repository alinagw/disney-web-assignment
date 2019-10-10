// when deployed, use locally defined values, otherwise use typical settings for server
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;

// use Express as our router
const Express = require('express');
const BodyParser = require('body-parser');

// create express app
const app = Express();

// // parse form data more easily
app.use(BodyParser.urlencoded({
    extended: true
}));
// // parse JSON form data
app.use(BodyParser.json());

app.get('/api/people', (req, res) => {
    // get people and return
});

app.post('/api/people', (req, res) => {
    const { name, email, zip, birthday } = req.body;
    // create new person
});

app.put('/api/people/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, zip, birthday } = req.body;
    // update person
});

app.delete('/api/people/:id', (req, res) => {
    const id = parseInt(req.params.id);
    // remove person from id
});

// start server to listen for requests
app.listen(PORT, function () {
    console.log(`Server is listening on port http://${this.address().address}:${this.address().port}`);
});