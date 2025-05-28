//1. Eliminar Documents de la col·lecció “movieDetails”.

//a. Elimina la pel·lícula que en el títol tingui Star Trek.
db.movieDetails.find({"title": "Star Trek"}).count();
//Return: 1
db.movieDetails.deleteOne({"title": "Star Trek"});
db.movieDetails.find({"title": "Star Trek"}).count();
//Return: 0

//b. Elimina la pel·lícula Love Actually.
db.movieDetails.find({"title": "Love Actually"}).count();
//Return: 1
db.movieDetails.deleteOne({"title": "Love Actually"});
db.movieDetails.find({"title": "Love Actually"}).count();
//Return: 0

//c. Elimina les pel·lícules que en el camp rated tingui "G".
db.movieDetails.find({"rated": "G"}).count();
//Return: 31
db.movieDetails.deleteMany({"rated": "G"});
db.movieDetails.find({"rated": "G"}).count();
//Return: 0


//d. Elimina les pel·lícules que siguin etiquetades com "Western".
db.movieDetails.find({"genres": "Western"}).count();
//Return: 33
db.movieDetails.deleteMany({"genres": "Western"});
db.movieDetails.find({"genres": "Western"}).count();
//Return: 0

//e. Elimina les pel·lícules que no hagin guanyat cap premi.
db.movieDetails.find({"awards.wins" : 0}).count();
//Return: 1607
db.movieDetails.deleteMany({"awards.wins" : 0});
db.movieDetails.find({"awards.wins" : 0}).count();
//Return: 1607 (suposem que cap pel·lícula te 0 premis guanyats)