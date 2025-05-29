//1) De la col·lecció «books» mostra tots els llibres que tinguin com a mínim 5 authors.
db.books.aggregate([
    { $project: {
        _id: 0,
        title: 1,
        authors: { $size: "$authors" }
      }
    },
      { $match: { authors: { $gte: 5 } } }
  ]);
//2) De la col·lecció «books» mostra els llibres ordenats per número d’autors de forma descendent. Primer els llibres amb més autors i al final els llibres amb menys autors.
db.books.aggregate([
    {$project:{
       _id: 1,
       title: 1,
       authors: {$size: "$authors"}
        }
    },
    {$sort:{authors: -1}}
])
//3) De la col·lecció «books» mostra els ISBN per cada Status "status". Utilitza l’estructura aggregate, i utilitza les funcions $group i $addToSet.
db.books.aggregate([
    {$group:{
        _id: "$status",
        status: {$addToSet: "$isbn"}
        }
    }

])
//4) De la col·lecció «restaurants» mostra quantes valoracions "grades" té cada restaurant.
db.restaurants.aggregate([
    {$project:{
        _id: 0,
        grades: {$size:"$grades"}
        }
    }
])
//5) De la col·lecció «restaurants» mostra quantes vegades apareix cada valoració "score" del camp grades.
db.restaurants.aggregate([
    {$unwind:"$grades"},
    {$group:{
        _id: $grades.score,
        num:{$sum:1}
    }}
])
//6) De la col·lecció «restaurants» mostra quantes vegades la valoració "score" del camp grades ha sigut 11.
db.restaurants.aggregate([
    {$unwind:"$grades"},
    {$group:{
        _id:$grade.score,
        num:{$sum:1}
    }},
    {match:{ "_id": "11"}}
])
//7) De la col·lecció «restaurants» mostra quantes vegades apareix cada valoració "score" del camp grades però mostra només les valoracions que apareixen més de 60 vegades.
db.restaurants.aggregate([
    {$unwind: "$grades"},
    {$group:{
        _id:$grades.score,
        num:{$sum:1}
    }},
    {match:{"num": {$gt: 60}}}
])
//8) De la col·lecció «restaurants» mostra els tipus de cuina "cuisine" de cada barri "borough".
db.restaurants.aggregate([
    {$group:{
        _id: "borough",
        status: {$addToSet: "$cusine"}
    }
    }
])
//9) De la col·lecció "restaurants" mostra els noms dels carrers per cada codi postal.
db.restaurants.aggregate([
    {$group:{
        _id:{ 
            CodiPostal : "$address.zipcode"
        },
        "carrer":{$addToSet: "$adress.street"}
    }}
])
//10) De la col·lecció "restaurants" mostra quants restaurants hi ha en cada codi postal.
db.restaurants.aggregate([
    {_id: "adress.zipcode",
    total: {$count:{}}}
])