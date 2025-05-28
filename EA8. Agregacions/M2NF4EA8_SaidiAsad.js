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
    { $project: {
        _id: 0,
        title: 1,
        authors: { $size: "$authors" }
    }
    },
    {
        $sort: {
            authors: -1
        }
    }
]);

//3) De la col·lecció «books» mostra els ISBN per cada Status "status". Utilitza l’estructura aggregate, i utilitza les funcions $group i $addToSet.
db.books.aggregate([
  {
    $group: {
      _id: "$status",
      isbns: { $addToSet: "$ISBN" }
    }
  }
])

//4) De la col·lecció «restaurants» mostra quantes valoracions "grades" té cada restaurant.
db.restaurants.aggregate([
  {$project:{
      _id: 0,
      title: 1,
      grades: {$size:"$grades"}
    }
  }
])