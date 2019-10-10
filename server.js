// when deployed, use locally defined values, otherwise use typical settings for server
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;

// use Express as our router
const Express = require('express');
const BodyParser = require('body-parser');
const Cors = require('cors');
const Sequelize = require('sequelize');

// create express app
const app = Express();
app.use(Cors());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

var db = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

var Person = db.define('person', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    zip: Sequelize.STRING,
    birthday: Sequelize.STRING
}, {});

//db.sync({ force: true });
Person.sync({ force: true }).then(function () {
    var carlos = {
        name: "Carlos",
        email: "carlos@gmail.com",
        zip: 27705,
        birthday: "1997-02-01"
      };
    return Person.create(carlos);
});

app.get('/api/people', (req, res) => {
    return Person.findAll()
    .then((people) => res.send(people))
    .catch((error) => res.send(error));
});

app.post('/api/people', (req, res) => {
    const { name, email, zip, birthday } = req.body;
    // create new person
    return Person.create({ name, email, zip, birthday })
    .then((person) => res.send(person))
    .catch((error) => res.send(error));
});

app.put('/api/people/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, zip, birthday } = req.body;
    // update person
    return Person.findByPk(id)
    .then((person) => {
        return person.update({ name, email, zip, birthday })
        .then(() => res.send(person))
        .catch((error) => res.send(error));
    });
});

app.delete('/api/people/:id', (req, res) => {
    const id = parseInt(req.params.id);
    // remove person from id
    return Person.findByPk(id)
    .then((person) => person.destroy())
    .then(() => res.send(person))
    .catch((error) => res.send(error));
});

// start server to listen for requests
app.listen(PORT, function () {
    console.log('Server is listening on port 3000');
});