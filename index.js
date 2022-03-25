const express = require('express');
const cors = require('cors');
const app = express();
//import fetch from 'node-fetch';
const fetch = require('node-fetch')

app.use(cors());        // Avoid CORS errors in browsers
app.use(express.json()) // Populate req.body

/*const movies = [

{id: 1,
name: "American Psycho",

writers: [
"Bret Easton Ellis",
"Mary Harron",
"Guinevere Turner"
],

top_cast: [
"Christian Pale",
"Justin Theroux",
"Josh Lucas",
"Bill Sage",
"Chloë Sevigny",
"Reese Witherspoon",
"Samantha Mathis",
"Matt Ross",
"Jared Leto",
"Willem Dafoe",
"Cara Seymour",
"Gulnevere Turner",
"Stephen Bogaert",
"Monika Meier",
"Reg E. Cathey",
"Blair Williams",
"Marie Dame",
"Kelley Harron"
]},

{id: 2,
name: "Nightcrawler",

writers: "Dan Gilroy",

top_cast: [
"Jake Gyllenhaal",
"Rene Russo",
"Bill Paxton",
"Riz Ahmed",
"Michael Papajohn",
"Marco Rodriguez",
"James Huang",
"Kent Schocknek",
"Pat Harvey",
"Sharon Tay",
"Rick Garcia",
"Leah Fredkin",
"Bill Seward",
"Rick Chambers",
"Holly Hannula",
"Jonny Coyne",
"Nick Chacon",
"Kevin Dunigan"
]},

{id: 3,
name: "Drive",

writers: [
"Hossein Amini",
"James Sallis"
],

top_cast: [
"Ryan Gosling",
"Carey Mulligan",
"Bryan Cranston",
"Albert Brooks",
"Oscar Isaac",
"Christina Hendricks",
"Ron Perlman",
"Kaden Leos",
"Jeff Wolfe",
"James Biberi",
"Russ Tamblyn",
"Joe Bucaro III",
"Tiara Parker",
"Tim Trella",
"Jimmy Hart",
"Tina Huang",
"Andy San Dimas",
"John Pyper-Ferguson"
]}

]*/





app.get('/movies', (req, res) => {
    res.send(movies)
})

app.get('/movies/:id', (req, res) => {
    if (typeof movies[req.params.id - 1] === 'undefined') {
        return res.status(404).send({ error: "Widget not found" })
    }
    res.send(movies[req.params.id - 1])
})

app.post('/movies', (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }   
    let newWidget = {
        id: movies.length + 1,
        price: req.body.price,
        name: req.body.name
    }
    movies.push(newWidget)
    res.status(201).location('localhost:8080/movies/' + (movies.length - 1)).send(
        newWidget
    )
})

//fetch('http://localhost:8080/movies/') // can fetch directly from file
fetch('movies.json')
    .then(function(response) {
        console.log('data fetched')
        console.log( response.json() )
        return response.json();
    })
    .then(function (data) {
        console.log('appended data')
        appendData(data);
    })
    .catch(function(err) {
        console.log('data not fetched')
    })

function appendData(data) {
    var mainContainer = document.getElementById('myData')
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement('div');
        div.innerHTML = 'Name: ' + data[i].top_cast;
        mainContainer.appendChild(div);
    }
}

app.listen(8080, () => {
    console.log(`API up at: http://localhost:8080`)
})
