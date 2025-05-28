//mongorestore C:\Users\Asad\Desktop\m2\DATASETS\cinema\dump

//1. Inserció de dades. Inserta els següents documents dins la col·lecció “movieDetails”.
db.movieDetails.insertOne({
    title : "Fight Club",
    writer : "Chuck Palahniuk",
    year : 1999,
    actors : [
        "Brad Pitt",
        "Edward Norton"
    ]
})

//b
db.movieDetails.insertOne({
    title : "Pulp Fiction",
    writer : "Quentin Tarantino",
    year : 1994,
    actors : [
        "John Travolta",
        "Uma Thurman"
    ]
})

//c
db.movieDetails.insertOne({
    title : "Inglorious Bastards",
    writer : "Quentin Tarantino",
    year : 2009,
    actors : [
        "Brad Pitt",
        "Diane Kruger",
        "Eli Roth"
    ]
})

//d
db.movieDetails.insertOne({
    title : "The Hobbit: The Desolation of Smaug",
    writer : "J.R.R. Tolkein",
    year : 2013
})

//e
db.movieDetails.insertOne({
    title : "The Hobbit: The Battle of the Five Armies",
    writer : "J.R.R. Tolkein",
    year : 2012,
    synopsis : "Bilbo and Company are forced to engage in a war against an array of combatants and keep the Lonely Mountain from falling into the hands of a rising darkness."
})

//f
db.movieDetails.insertOne({
    title : "The Shawshank Redemption",
    writer : "Stephen King",
    year : 1994,
    actors : [
        "Tim Robbins",
        "Morgan Freeman",
        "Bob Gunton"
    ],
    synopsis : "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
})

//g
db.movieDetails.insertOne({
    title : "Avatar",
    writer : "James Cameron",
    year : 2009,
    actors : [
        "Sam Worthington",
        "Zoe Saldana",
        "Sigourney Weaver"
    ],
    synopsis : "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.."
})

//2. Consulta de dades. Cerca dins de la col·lecció “movieDetails”.