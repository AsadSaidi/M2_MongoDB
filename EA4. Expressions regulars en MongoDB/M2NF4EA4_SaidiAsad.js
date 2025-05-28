//1. Consulta de dades utilitzant expressions regulars a la col·lecció “movieDetails”.

//a. Cerca totes les pel·lícules que a la seva sinopsis conté la paraula “Bilbo”.
db.movieDetails.find({ plot: { $regex: "Bilbo", $options: "i" }}).pretty()

//b. Compta les pel·lícules que al camp "plot" no contngui la paraula "Bilbo".
db.movieDetails.countDocuments({ "plot": { $not: /Bilbo/ } })

//c. Cerca totes les pel·lícules que a la seva sinopsis conté la paraula "Bilbo" o al camp "plot" conté la paraula "Bilbo".
db.movieDetails.find({$or : [{"synopsis": /Bilbo/i}, {"plot": /Bilbo/i}]});

//d. Cerca totes les pel·lícules que al camp "plot" conté les paraules "dwarves" o "hobbit".
db.movieDetails.find({$or : [{"plot": /dwarves/i}, {"plot": /hobbit/i}]});
db.movieDetails.find({"plot": /dwarves|hobbit/i});

//e. Cerca totes les pel·lícules que al seu títol conté les paraules "Battle" i "Armies".
db.movieDetails.find({$and : [{"title": /Battle/i}, {"title": /Armies/i}]});


