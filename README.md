# Disney TVA Take Home Web Assignment

Made by **Alina Walling** for the Disney TV Animation Associate Web Developer Position in 2019.

## Usage

##### 1. Clone Repo

Download it to your local machine or clone with git

```
git clone https://github.com/alinagw/disney-web-assignment.git
```

##### 2. Install Dependencies

```
cd disney-web-assignment
npm install
```

##### 3. Start Express Server

Server will run on `http://localhost:3000`.

```
npm start
```

##### 4. Start the Development Server

Web app should run locally at `http://localhost:8080`. Navigate to this URL (or the URL indicated in your terminal after running the command) to access the web app.

```
npm run serve
```

## Approach

The guidelines were fairly open ended, so I definitely liked having the room to use my own tech stack and design my own UI. I've completed web app projects similar to and/or more complex than this before, so I had experience with most tools in my tech stack before. For the sake of simplicity, I stuck to what I was comfortable with already: Vue, Vuetify, Express, and Node. However, I hadn't used SQLite before as a local database, so I still had some learning to do while developing the app!

Vue is my go to reactive web framework because it's what I've used the most in past projects. In terms of managing an array of people that can be updated and reactively display on the front-end, I already knew exactly how to use Vue to tackle that functionality. When building the app, I implemented all the adding, deleting, and editing people functions using just Vue before adding in the backend database and API requests. That way, the website functioned how I wanted it to, but the data wasn't persistent when the page was refreshed and the Vue instance was reloaded (obviously). By implementing the app using only Vue first, it made it easier to integrate the backend by making sure to pull from and save the data originally stored only in the Vue instance to the backend database.

I used Vuetify for the UI web component library so I didn't need to spend a lot of time custom styling everything myself. It is something I had used before as well, so I was familiar with the syntax, styles, and capabilities. Also, Vuetify has a data table component with sorting features built in, so I didn't have to implement that myself and instead I could focus on implementing the other parts of the app.

I've used Express in past projects to start a server for handling API requests. I set the server up in the `server.js` file. In this case, I didn't deploy my app so the server only runs locally. By creating the Express app, I added `get` (fetch the list of people from the database), `post` (add a new person), `put` (update an existing person in the database), and `delete` (remove a person) API requests to the app to handle all the necessary functions for managing the person objects. On the front-end, I used Axios to handle making the API requests via the API url.

Now we get into the part that was new for me... I've used primarily Firebase as my database when making web apps. Obviously, I didn't need to set up an online database for this project – storing data in memory or a local SQLite database as mentioned in the requirements makes a lot more sense. But that also meant I needed to break away from my comfort zone with Firebase and look into how to use SQLite. I did research into how it works, looking up info from the SQLite Tutorial (linked in references) to get started. I figured out how to get it installed, but definitely got a little lost when reading about how to query data with all the MySQL commands that I hadn't really coded with before. Given more time, I would experiment and pick up the syntax for MySQL pretty quickly. But for the time being, I thought it would be helpful to grab a tool that would wrap the syntax of the SQLite database in something more understandable.

I landed on Sequelize, which supported SQLite and handled setting up the connection to the database as well as all the querying and modifying functions I needed for this project. Since I was only dealing with one type of object stored in the database (person objects), it was easy to create a `Person` model for Sequelize to handle my table of person objects. Models have the ability to `create`, `update`, and `destroy` instances of themselves in the database in a more familiar syntax and with Promises. Essentially, it was easier for me to understand the documentation and implementation of Sequelize in a shorter amount of time than with the SQLite tutorial.

Also in my `server.js` file, I set up the Sequelize database using SQLite and created a `Person` model with the necessary data fields: `name`, `email`, `zip`, and `birthday`. So every new created person object would contain those fields. Once establishing the database, I added functions for modifying the database into the relevant API request functions. Then I just had to call the API from the front end to update the database alongside the Vue instance I was already updating.

I hooked all the pieces together and tested to see if everything worked properly. I ran into errors with querying the database at first, first due to CORS problems, then due to not syncing the Person model with the database, then due to using the wrong Sequelize function name, and a couple of other bugs. I fixed bugs, tested more, checked to see if actions not only worked once but multiple times in a row, etc. At the end though, everything seems to run smoothly!

A little bit about the UI/UX... I like to make my projects interesting somehow with a story :) It wouldn't be very fun if I just gave you a data table of people, so I wanted to dress it up a little bit. The requirements made me think of a digital address book, but I decided to take that a step further and honor one of the best chick flicks of all time: _Mean Girls_. If you've seen the movie, you probably know about the Burn Book, where you write the names of all your enemies down and what makes them terrible. In this digital burn book, I stuck to just the required fields, but keeping track of their contact info can help you to one day take your revenge. Email, zip code, and birthday is definitely enough to work with. 

I thought the idea was pretty funny because it makes an address book a little more interesting. It makes you think more about your life and the people in it from a unique perspective when you're using it. Hopefully it made you laugh a little. It wasn't hard to implement: adding some colors, fire emojis, and funny supporting text is all I needed. But it really makes a difference at the end of the day in terms of how much you enjoy using my app.

Reflecting back, I had fun with this project. After reading the description, I knew I could do it and would have no problem taking it on. I've done it before, but I still got to learn some new things and practice reading documentation and picking up new frameworks and libraries again. And I got to be a little creative with the UI/UX which I always appreciate. Re-reading the requirements, I realize now that I actually didn't need to implement the editing people feature... I could have sworn I read that before but I guess I just assumed I needed to include that feature since it is often coupled with the adding and deleting features. So enjoy the little bit of extra functionality there!

I really hope you enjoy! :D 

#### Tech Stack
* Vue
* Vuetify
* Express
* SQLite
* Sequelize
* Node

## References
* [Vue Docs](https://vuejs.org/)
* [Vuetify Docs](https://vuetifyjs.com/en/)
* [SQLite Tutorial](https://www.sqlitetutorial.net/)
  * [SQLite Node.js Tutorial](https://www.sqlitetutorial.net/sqlite-nodejs/)
* [Sequelize Docs](https://sequelize.org/master/)
* [Axios Docs](https://github.com/axios/axios)
* [Material Design Icons](https://materialdesignicons.com/)
* [UI Gradients](https://uigradients.com/)
* [Google Fonts](https://fonts.google.com/)
* [StackOverflow Sequelize FindById](https://stackoverflow.com/questions/41577597/sequelize-findbyid-is-not-a-function-but-apparently-findall-is)
* Referenced some of my old web projects in the past