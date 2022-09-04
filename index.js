const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const port = 8080;

const path = require('path')

//app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))
//app.use('/css', express.static(path.join(__dirname, 'public')))
//app.use('/public', express.static(path.join(__dirname, 'public')))
//console.log(path.join(__dirname, 'public/css/'))

app.use(cors());        // Avoid CORS errors in browsers
app.use(express.json()) // Populate req.body
app.use(session({
	secret: 'secret',
    cookie: { maxAge: 300000},
	resave: true,
	saveUninitialized: true
}));

AccountsArray = {
    "username": "admin",
    "password": "qwerty"
}

const movies = require('./movies.json');
console.log(`Read ${movies.length} objects from movies.json.`);

app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/public/css/style.css')
    /*var movieLen = movies.length;
    while (movies.length >= movieLen) {
      console.log('hello')
      movieLen =- 1;
    }*/

    if (req.session.loggedin === true) {
        res.write(`
        <link href="css/stylesheet_admin.css" rel="stylesheet">
        <script src="js/script.js"></script>

        <h1><b>Movie Data // Admin Panel</b></h1>
        <hr>
        <div id="buttons">
        `)
        console.log("detected admin login")
    } else {
        res.write(`
        <link href="css/stylesheet.css" rel="stylesheet">
        <script src="js/script.js"></script>

        <div id="main_bar">
            <div id="menu_bar" style="text-align: center;">
            <h1><b>Movie Data</b></h1>
            </div>
            <div id="menu_bar" style="float: right;">
            <button type="button" onclick=rerouteToLogin();>Login to make changes</button>
            </div>
        </div>
        <hr>
        <div id="buttons">
        `)
        console.log("no admin login detected")
    }


    movies.forEach(currentMovie => {
      res.write(`
      <button type="button" onclick=rerouteToMovie(${currentMovie.id});>${currentMovie.name}</button>
      `)
    })
    res.write(`
    </div>
    `)
    res.send();
})

app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: path.join(__dirname, 'public/html') })
/*  res.write(`
  <link href="../css/stylesheet.css" rel="stylesheet">
  <script src="../js/script.js"></script>
  
  <h1><b>Movie Data // Login page</b></h1>
  <hr>
  
  <!--https://codeshack.io/basic-login-system-nodejs-express-mysql/-->

  `)
  res.send()*/
})

// http://localhost:3000/auth
app.post('/auth', function(req, res) {
	// Capture the input fields
	let username = req.body.username;
	let password = req.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
        
        const storedUN = AccountsArray["username"];
        const storedPW = AccountsArray["password"];
        var accountState;
        // please fix this 

        if (storedUN === username && storedPW === password) {
            accountState = 2
        } else if (storedUN === username && storedPW !== password) { // alot of security issues
            accountState = 1
        } else {
            accountState = 0
        }

        //if (error) throw error;

        if (accountState === 2) {
            //res.send("User authenticated")
            req.session.loggedin = true;
            req.session.username = username;

            res.redirect('/')
        } else if (accountState === 1) {
            res.send("Incorrect password")
        } else {
            res.send("Account doesn't exist")
        }

    } else {
		res.send('Please enter Username and Password!');
        console.log(`req.body.username == ${req.body.username}`);
		res.end();
	}
});


// method of debugging
app.post('/authenticate', (req, res) => {
    res.send(`Sent data - ${req.body.username}`)
    // comments don't work in posts
});

app.get('/movies', (req, res) => {
    res.send(movies)
})

app.get('/movies/:id', (req, res) => {
    if (typeof movies[req.params.id - 1] === 'undefined') {
        return res.status(404).send({ error: "Movie not found" })
    }

    if (req.session.loggedin === true) {
        res.write(`
        <link href="../css/stylesheet_admin.css" rel="stylesheet">
        <script src="../js/script.js"></script>
    
        <div id="main_bar">
            <div id="menu_bar" style="float: left;">
            <button type="button" onclick=rerouteToHome();>Return to List</button>
            </div>
            <div id="menu_bar" style="text-align: center;">
            <h1><b>Movie Data // Admin Panel</b></h1>
            </div>
            <div id="menu_bar" style="float: right;">
            <button type="button" onclick=rerouteToLogin();><span style="font-weight: bold;">MODIFY</span></button>
            </div>
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
    } else {
        res.write(`
        <link href="../css/stylesheet.css" rel="stylesheet">
        <script src="../js/script.js"></script>
        
        <div id="main_bar">
            <div id="menu_bar" style="float: left;">
            <button type="button" onclick=rerouteToHome();>Return to List</button>
            </div>
            <div id="menu_bar" style="text-align: center;">
            <h1><b>Movie Data</b></h1>
            </div>
            <div id="menu_bar" style="float: right;">
            <button type="button" onclick=rerouteToLogin();>Login to make changes</button>
            </div>
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
    }

    res.send();
})


// JSON data for all movies
app.post('/movies', (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    let newMovie = {
        id: movies.length + 1,
        price: req.body.price,
        name: req.body.name
    }
    // deprecated - set for removal
    /*movies.push(newMovie)
    res.status(201).location('localhost:8080/movies/' + (movies.length - 1)).send(
        newMovie
    )*/
})

app.listen(port, () => {
	
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(`${time} - API up at: http://localhost:8080
    `)
})

// nodemon .
