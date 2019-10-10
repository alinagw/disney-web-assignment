const PORT = process.env.PORT || 3000;

// use Express as our router
const Express = require('express');
const BodyParser = require('body-parser');
const Cors = require('cors');
// use Sequelize for our local database
const Sequelize = require('sequelize');

// create express app
const app = Express();
app.use(Cors());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

// create SQLite database with Sequelize
var db = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// define person model for database
var Person = db.define('person', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    zip: Sequelize.STRING,
    birthday: Sequelize.STRING
}, {});

// create table in database for people
Person.sync({ force: true });

// API get people from database
app.get('/api/people', (req, res) => {
    return Person.findAll()
    .then((people) => res.send(people))
    .catch((error) => res.send(error));
});

// API add new person to database
app.post('/api/people', (req, res) => {
    const { name, email, zip, birthday } = req.body;
    return Person.create({ name, email, zip, birthday })
    .then((person) => res.send(person))
    .catch((error) => res.send(error));
});

// API update person in database
app.put('/api/people/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, zip, birthday } = req.body;
    return Person.findByPk(id)
    .then((person) => {
        return person.update({ name, email, zip, birthday })
        .then(() => res.send(person))
        .catch((error) => res.send(error));
    });
});

// API delete person from database
app.delete('/api/people/:id', (req, res) => {
    const id = parseInt(req.params.id);
    return Person.findByPk(id)
    .then((person) => person.destroy())
    .then(() => res.send(person))
    .catch((error) => res.send(error));
});

// start server to listen for requests
app.listen(PORT, function () {
    console.log(`Server is listening on port ${PORT}`);
});