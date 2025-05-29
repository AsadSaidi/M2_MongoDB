//Importem la col·lecció "people" (Vigila la ruta on has guardat el fitxer "people_array.json" que trobaràs al Classroom).
> mongoimport --db itb --collection people --type json --file C:\Asad\people_array.json --jsonArray
//Importem la col·lecció "students" (Vigila la ruta on has guardat el fitxer "students.csv" que trobaràs al Classroom). 

> mongoimport --db itb --type csv --headerline --file C:\Asad\students.csv

//Importem la col·lecció "products" (Vigila la ruta on has guardat el fitxer "products.json" que trobaràs al Classroom).
> mongoimport --db itb --collection products --drop --file C:\Asad\products.json

//Iniciem el client des del terminal
> mongo 

//Un cop importades les col·leccións «people», «students» i «products» i iniciat el client mongo, accedim a la base de dades «itb».
> use itb

// Si vols veure les col·leccions «people», «students» i «products».
> show collections
//Retorna
people
products
students

/* EXERCICI 1 */
// Crear una base de datos con el nombre catalogo
use catalogo
//Retorna: switched to db catalogo

//Crear la colección productos
db.createCollection('productos',{} )