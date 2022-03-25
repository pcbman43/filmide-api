const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());        // Avoid CORS errors in browsers
app.use(express.json()) // Populate req.body

const movies = require('./movies.json');


app.get('/movies', (req, res) => {
    res.send(movies)
})

app.get('/movies/:id', (req, res) => {
    if (typeof movies[req.params.id - 1] === 'undefined') {
        return res.status(404).send({ error: "Movie not found" })
    }
    res.send(movies[req.params.id - 1])
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



app.listen(8080, () => {
    console.log(`API up at: http://localhost:8080`)
})