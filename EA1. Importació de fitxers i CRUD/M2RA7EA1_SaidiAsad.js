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

//Crear los siguientes documentos de a uno
db.productos.insertMany([
    {"name": "MacBook Pro"},
    {"name": "MacBook Air"},
    {"name": "MacBook"}])

//Listar las bases de datos disponibles
show dbs

//RETURN
[
    {
      "empty": false,
      "name": "admin",
      "sizeOnDisk": 40960
    },
    {
      "empty": false,
      "name": "catalogo",
      "sizeOnDisk": 8192
    },
    {
      "empty": false,
      "name": "config",
      "sizeOnDisk": 110592
    },
    {
      "empty": false,
      "name": "itb",
      "sizeOnDisk": 577536
    },
    {
      "empty": false,
      "name": "local",
      "sizeOnDisk": 73728
    }
]

//Listar las colecciones disponibles para la base de datos catalogo
show collections

//RETURN
[
    {
      "badge": "",
      "name": "productos"
    }
]

//Desconectar el cliente de MongoDB
exit

/* EXERCICI 2 */
//Levantar el cliente de MongoDB en la base de datos catalogo
use catalogo

//Buscar todos los documentos de la colección productos
db.productos.find()

//Buscar el documento que tiene la propiedad name con el valor MacBook Air
db.productos.find({ "name" : "MacBook Air"})

//RETURN
[
    {
      "_id": {"$oid": "6825a7d22c46597d118c6c97"},
      "name": "MacBook Air"
    }
]

/* EXERCICI 3 */
//Levantar el cliente de MongoDB en la base de datos catalogo
use catalogo

//Buscar todos los documentos de la colección productos
db.productos.find()

//Iterar sobre los documento utilizando hasNext y next para cada documento
var cursor = db.productos.find() ;

while ( cursor.hasNext() ){
    printjson(cursor.next()) ;
}
//RETURN
[
    { "_id" : ObjectId("6825a7d22c46597d118c6c96"), "name" : "MacBook Pro" },
    { "_id" : ObjectId("6825a7d22c46597d118c6c97"), "name" : "MacBook Air" },
    { "_id" : ObjectId("6825a7d22c46597d118c6c98"), "name" : "MacBook" }   
]

/* EXERCICI 4 */
//Levantar el cliente de MongoDB en la base de datos catalogo
use catalogo

//Insertar los siguientes documentos en la colección productos utilizando un sólo comando de MongoDB
db.productos.insertMany([
    {"name": "iPhone 8"},
    {"name": "iPhone 6s"},
    {"name": "iPhone X"},
    {"name": "iPhone SE"},
    {"name": "iPhone 7"}
])

//RETURN
[
    {
      "_id": {"$oid": "6825a7d22c46597d118c6c96"},
      "name": "MacBook Pro"
    },
    {
      "_id": {"$oid": "6825a7d22c46597d118c6c97"},
      "name": "MacBook Air"
    },
    {
      "_id": {"$oid": "6825a7d22c46597d118c6c98"},
      "name": "MacBook"
    },
    {
      "_id": {"$oid": "6825bc662c46597d118c6c9b"},
      "name": "iPhone 8"
    },
    {
      "_id": {"$oid": "6825bc662c46597d118c6c9c"},
      "name": "iPhone 6s"
    },
    {
      "_id": {"$oid": "6825bc662c46597d118c6c9d"},
      "name": "iPhone X"
    },
    {
      "_id": {"$oid": "6825bc662c46597d118c6c9e"},
      "name": "iPhone SE"
    },
    {
      "_id": {"$oid": "6825bc662c46597d118c6c9f"},
      "name": "iPhone 7"
    }
]

//Buscar el docuemnto que tiene la propiedad name con el valor iPhone 7
db.productos.find({ "name" : "iPhone 7"})

//RETURN
[
    {
      "_id": {"$oid": "6825bc662c46597d118c6c9f"},
      "name": "iPhone 7"
    }
]

//Buscar el docuemnto que tiene la propiedad name con el valor MacBook
db.productos.find({ "name" : "MacBook"})

//RETURN
[
    {
      "_id": {"$oid": "6825a7d22c46597d118c6c98"},
      "name": "MacBook"
    }
]

// EXERCICI 5
//Borrar la colección productos
db.products.drop()
//Borrar la base de datos catalogo
use itb
db.dropDatabase()
//Crear la base de datos catalogo y colección productos de nuevo
use itb
db.createCollection("products"
//Insertar los siguientes documentos utilizando un sólo comando de MongoDB
db.products.insertMany([
  { "name": "iPhone 8" },
  { "name": "MacBook Pro" },
  { "name": "iPhone 6s" },
  { "name": "MacBook Air" },
  { "name": "iPhone X" },
  { "name": "iPhone SE" },
  { "name": "MacBook" },
  { "name": "iPhone 7" }
])

// Buscar el producto que tiene la propiedad name con el valor iPhone X
db.products.find({ name: "iPhone X" })

//EXERCICI6

//Buscar los documentos que tienen la propiedad price con el valor de 329
db.products.find({ price: 329 }).pretty()

//Buscar los documentos que tienen la propiedad stock con el valor de 100
db.products.find({ stock: 100 }).pretty()

//Buscar los documentos que tienen la propiedad name con el valor de Apple Watch Nike+
db.products.find({ name: 'Apple Watch Nike+'}).pretty()

//EXERCICI7

//Buscar los productos que tienen la propiedad name con el valor 1 y la propiedad price con el valor 1
db.products.find({ name: 1, price: 1 }).pretty()

//Buscar los productos que tienen las categorías macbook y notebook
db.products.find({ categories: 'macbook', categories: 'notebook' }).pretty()

//Buscar los productos que tienen la categoría watch
db.products.find({ categories: 'watch'}).pretty()

//EXERCICI8
//Buscar los productos que tienen la propiedad price con el valor 2399 y mostrar sólo la propiedad name en el resultado
db.products.find({ price: 2399 }, { _id: 0, name: 1 }).pretty()

//Buscar los productos que tienen la propiedad categories con el valor iphone y ocultar las propiedad stock y picture del resultado
db.products.find({ categories: "iphone" },{ _id: 0, stock: 0, picture: 0 }).pretty()

//EXERCICI9
//Buscar los productos que tienen la propiedad price mayor a 2000
db.products.find({ price: { $gt: 2000 } })

//Buscar los productos que tienen la propiedad price menor a 500
db.products.find({ price: { $lt: 500 } })

//Buscar los productos que tienen la propiedad price menor o igual que 500
db.products.find({ price: { $lte: 500 } })

//Buscar los productos que tienen la propiedad price en el rango de 500 a 1000
db.products.find({ price: { $gte: 500, $lte: 1000 } })

//Buscar los productos que tienen la propiedad price con alguno de los siguientes valores 399 o 699 o 1299 (hacer en un solo query)
db.products.find({ price: { $in: [399, 699, 1299] } })

//EXERCICI10
//Buscar los productos que tienen la propiedad stock con el valor 200 Y tienen la categoría iphone (utlizar el operador and)
db.products.find({ $and: [{ stock: 200 },{ categories: "iphone" }]})

//Buscar los productos que tienen la propiedad price con el valor 329 O tienen la categoría tv (utlizar el operador or)
db.products.find({$or: [{ price: 329 },{ categories: "tv" }]})

//EXERCICI11
//Actualizar el producto que tiene la propiedad name con el valor Mac mini y establecer la propiedad stock con el valor 50
db.products.updateOne({ name: "Mac mini" },{ $set: { stock: 50 } })

//Actualizar el producto que tiene la propiead name con el valor iPhone X y agregarle la propiedad prime con el valor true
db.products.updateOne({ name: "iPhone X" },{ $set: { prime: true } })

//Buscar los documentos actualizados y listarlos mostrando los datos de forma más linda y ocultando las propiedades stock, categories y _id
db.products.find({ name: { $in: ["Mac mini", "iPhone X"] } },{ stock: 0, categories: 0, _id: 0 }).pretty()

//EXERCICI 12
// Actualizar el producto con la propiedad name y el valor iPad Pro agregadole una categoría nueva llamada prime
db.products.updateOne({name: "iPad Pro" }, {$push: { categories: "prime" } })

// Actualizar el producto con la propiedad name y el valor iPad Pro sacar la categoría agregada (último elemento de la propiedad categories)
db.products.updateOne({"name": "iPad Pro"}, {$pop: { "categories": 1}})

// Actualizar el producto con la propiedad name y el valor iPhone SE sacar la primer categoría que tiene asignada
db.products.updateOne({name: "iPhone SE" }, {$pop: { categories: -1 } })

// Actualizat todos los documentos que tienen la propiedad price mayor a 2000 y agregarle la categoría expensive
db.products.updateMany({"price": {$gte: 2000}}, {$push: { "categories": "expensive"}})

//EXERCICI 13
// Borrar todos los productos que tienen la categoía tv
db.products.deleteMany({"categories": "tv"})

// Borrar el producto que tiene la propiedad name con el valor Apple Watch Series 1
db.products.deleteOne({"name": "Apple Watch Series 1"})

// Obtener la propiedad _id del producto que tiene la propiedad name con el valor Mac mini
db.products.findOne({ name: "Mac mini" }, { _id: 1 })

// Utilizar el _id buscado para borrar el producto utilizando ese criterio
db.products.deleteOne({"_id": "68258a69412d3e8727c6e61d"})

//EXERCICI 14
db.products.find().pretty()


//EXERCICI 15

// Buscar todos los productos y ordenarlos por la propiedad price ascendente
db.products.find({}, {name:1, _id: 0}).sort({price: 1})

// Buscar todos los productos y ordenarlos por la propiedad price descendente
db.products.find({}, {name:1, _id: 0}).sort({price: -1})

// Buscar todos los productos y ordenarlos por la propiedad stock ascendente
db.products.find({}, {name:1, _id: 0}).sort({stock: 1})

// Buscar todos los productos y ordenarlos por la propiedad stock descendente
db.products.find({}, {name:1, _id: 0}).sort({stock: -1})

// Buscar todos los productos y ordenarlos por la propiedad name ascendente
db.products.find({}, {name:1, _id: 0}).sort({name: 1})

// Buscar todos los productos y ordenarlos por la propiedad name descendente
db.products.find({}, {name:1, _id: 0}).sort({name: -1})


//EXERCICI 16
// Mostrar sólo la propiedad name de los primeros 2 productos
db.products.find({}, {name:1, _id: 0}).limit(2).sort({name: 1})

// Mostrar sólo la propiedad name de los primeros 5 productos ordenados por nombre
db.products.find({}, {name:1, _id: 0}).limit(5).sort({name: 1})

// Mostrar sólo la propiedad name de los últimos 5 productos ordenados por nombre
db.products.find({}, {name:1, _id: 0}).limit(5).sort({name: -1})

//EXERCICI 17
// Mostrar todos los documentos de la colección products utilizando un paginador
db.products.find().skip(0).limit(5).pretty()