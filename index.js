const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

const path = require('path')
app.use(express.static('public'))
//app.use('/css', express.static(path.join(__dirname, 'public')))
//app.use('/public', express.static(path.join(__dirname, 'public')))
console.log(path.join(__dirname, 'public/css/'))

app.use(cors());        // Avoid CORS errors in browsers
app.use(express.json()) // Populate req.body

//CSS


const movies = require('./movies.json');
console.log(movies.length);

app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/public/css/style.css')
    /*var movieLen = movies.length;
    while (movies.length >= movieLen) {
      console.log('hello')
      movieLen =- 1;
    }*/
    res.write(`
    <link href="css/stylesheet.css" rel="stylesheet">
    <script src="js/script.js"></script>
    `)

    res.write(`
    <h1><b>Movie Data</b></h1>
    <hr>
    <div id="buttons">`)
    movies.forEach(currentMovie => {
      res.write(`
      <button type="button" onclick=rerouteToMovie(${currentMovie.id});>${currentMovie.name}</button>
      `)
      //res.write("<button>"+currentMovie.name+"</button>")
      //res.write('<button type="button">'+currentMovie.name+'</button>')
      //res.send(`<button type="button">${currentMovie.name}</button>`)
    })
    res.write(`
    </div>
    `)
    res.send();
      //res.send('<button type="button">Click Me!</button>')
})

/*
app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/public/css/style.css')
    res.sendFile(__dirname + '/index.html')
})
*/

app.get('/movies', (req, res) => {
    res.send(movies)
})

app.get('/movies/:id', (req, res) => {
    if (typeof movies[req.params.id - 1] === 'undefined') {
        return res.status(404).send({ error: "Movie not found" })
    }
    //res.send(movies[req.params.id - 1])
    //res.write('<link rel="stylesheet" type="text/css" href="../../public/css/style.css">')
    /*res.write("<p> #ID: " + JSON.stringify(movies[req.params.id - 1].id) + "</p>")
    res.write("<p> Movie name: " + JSON.stringify(movies[req.params.id - 1].name.toString()) + "</p>")
    res.write("<p> Writers: " + JSON.stringify(movies[req.params.id - 1].writers.toString()) + "</p>")
    res.write("<p> Top cast: " + JSON.stringify(movies[req.params.id - 1].top_cast, null, ' ') + "</p>")*/
    /*    <p> #ID: ${JSON.stringify(movies[req.params.id - 1].id)}</p>
    <p> Movie name: ${JSON.stringify(movies[req.params.id - 1].name.toString())}</p>
    <p> Writers: ${JSON.stringify(movies[req.params.id - 1].writers.toString())}</p>
    <p> Top cast: ${JSON.stringify(movies[req.params.id - 1].top_cast, null, ' ')}</p>*/

    res.write(`
    <link href="../css/stylesheet.css" rel="stylesheet">
    <script src="../js/script.js"></script>

    <div id="menu_bar">
    <button type="button" onclick=rerouteToHome();>Return to List</button>
    </div>
    <div id="menu_bar">
    <h1><b>Movie Data</b></h1>
    </div>

    <hr>
    <div id="data">

    <h1> ID: ${JSON.stringify(movies[req.params.id - 1].id)}</h1>
    <h2> Movie name: </h2>
    <h1 class="data">${JSON.stringify(movies[req.params.id - 1].name.toString())}</h1>
    <h2> Writers: </h2>
    <p class="data">${movies[req.params.id - 1].writers.toString().replace(/,/g, '<br>')}</p>
    <h2> Top cast: </h2>
    <p class="data">${(movies[req.params.id - 1].top_cast.toString()).replace(/,/g, '<br>')}</p>

    </div>
    `)
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

function rerouteUser(movieID) {
  location.href = '/movies/:movieID';
}

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

app.listen(port, () => {
	
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(`${time} - API up at: http://localhost:8080
    `)
})

// nodemon .
