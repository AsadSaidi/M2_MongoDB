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
