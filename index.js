const express = require('express');
const cors = require('cors');
const app = express();

const path = require('path')
app.use('/css', express.static(path.join(__dirname, 'public')))

app.use(cors());        // Avoid CORS errors in browsers
app.use(express.json()) // Populate req.body

//CSS


const movies = require('./movies.json');

app.get('', (req, res) => {
    //res.sendFile(__dirname + '/public/css/style.css')
    res.sendFile(__dirname + '/index.html')

})

app.get('/movies', (req, res) => {
    res.send(movies)
})

app.get('/movies/:id', (req, res) => {
    if (typeof movies[req.params.id - 1] === 'undefined') {
        return res.status(404).send({ error: "Movie not found" })
    }
    //res.send(movies[req.params.id - 1])
    //res.write('<link rel="stylesheet" type="text/css" href="../../public/css/style.css">')
    res.write("<p> #ID: " + JSON.stringify(movies[req.params.id - 1].id) + "</p>")  
    res.write("<p> Movie name: " + JSON.stringify(movies[req.params.id - 1].name.toString().replaceAll(',', ', ')) + "</p>")  
    res.write("<p> Writers: " + JSON.stringify(movies[req.params.id - 1].writers.toString().replaceAll(',', ', ')) + "</p>")  
    res.write("<p> Top cast: " + JSON.stringify(movies[req.params.id - 1].top_cast, null, ' ') + "</p>")
    //console.log(JSON.parse(movies))
    //res.sendFile('mainstyle.css', { root : __dirname})
    res.send(); 
    console.log(__dirname)
})

app.post('/movies', (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }   
    let newMovie = {
        id: movies.length + 1,
        price: req.body.price,
        name: req.body.name
    }
    movies.push(newMovie)
    res.status(201).location('localhost:8080/movies/' + (movies.length - 1)).send(
        newMovie
    )
})

function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display == "none" || x.style.display == "") {
    x.style.display = "block";
  } else {
    x.style.display = "none";

  }
}

function myFunction1() {
  var y = document.getElementById("myDIV1");
  if (y.style.display == "none" || y.style.display == "") {
    y.style.display = "block";
  } else {
    y.style.display = "none";

  }
}

function myFunction2() {
  var z = document.getElementById("myDIV2");
  if (z.style.display == "none" || z.style.display == "") {
    z.style.display = "block";
  } else {
    z.style.display = "none";

  }
}

app.listen(8080, () => {
    console.log(`API up at: http://localhost:8080`)
})

// nodemon .