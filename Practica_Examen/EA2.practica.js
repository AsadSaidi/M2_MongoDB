//1. Busqueu els estudiants de gènere masculí
db.students.find(
    {gender: "H"}
)

//2. Busqueu el estudiants de gènere femení
db.students.find(
    {gender: "M"}
)

//3. Busqueu els estudiants nascuts l’any 1993
db.students.find(
    {birth_year: 1993}
)

//4. Busqueu els estudiants de gènere masculí nascuts a l’any 1993
db.students.find(
    {birth_year: 1993, gender: "H"}
)

//5. Busqueu els estudiant nascuts a la dècada dels 90
db.students.find(
    {birth_year: {$gte: 1990, $lt: 2000 }}
)

//6. Busqueu els estudiants de gènere masculí nascuts abans del l’any 90
db.students.find(
    {birth_year: {$lt: 1990},gender: "H" }
)

//7. Busqueu els estudiants de gènere femení nascuts abans del l’any 90
db.students.find(
    {birth_year: {$lt: 1990},gender: "M" }
)

//8. Busqueu els estudiants nascuts a la dècada dels 80 i de gènere femení
db.students.find(
    {birth_year: {$gte: 1980, $lt: 1990 },gender: "M"}
)

//9. Busqueu els estudiants de gènere masculí nascuts a la dècada dels 80
db.students.find(
    {birth_year: {$gte: 1980, $lt: 1990 },gender: "H"}
)

//10. Busqueu els estudiants de gènere femení nascuts a la dècada dels 80
db.students.find(
    {birth_year: {$gte: 1980, $lt: 1990 },gender: "M"}
)

//11. Busqueu els estudiants que no han nascut a l’han 1985
db.students.find(
    {birth_year: {$ne: 1985}}
)

//12. Busqueu els estudiants nascuts als anys 1970, 1980 o 1990
db.students.find(
    {birth_year: {$in: [1970, 1980, 1990]}}
)

//13. Busqueu els estudiants no nascuts als anys 1970, 1980 o 1990
db.students.find(
    {birth_year: {$nin: [1970, 1980, 1990]}}
)

//14. Busqueu els estudiants nascuts en any parell
db.students.find(
    {birth_year: {$mod: [2,0]}}
)

//15. Busqueu els estudiants nascuts en any múltiple de 10
db.students.find(
    {birth_year: {$mod: [10,1]}}
)

//16. Busqueu els estudiants que tinguin telèfon auxiliar
db.students.find(
    {phone_aux: { $exists: true, $ne: ""}}
)

//17. Busqueu els estudiants que no tinguin segon cognom
db.students.find(
    {lastname2: { $eq: ""}}
)

//18. Busqueu els estudiants que tinguin telèfon auxiliar i un sol cognom
db.students.find(
    {phone_aux: { $exists: true, $ne: ""},lastname2: { $eq: ""} }
)

//19. Busqueu els estudiants que tinguin un email que acabi en .net
db.students.find(
    {email: {$regex: "\.net"}}
)

//20. Busqueu els estudiants que tinguin un nom que comenci per vocal
db.students.find(
    {firstname: {$regex: /^[aeiou]/, $options: 'i'}}
)

//21. Busqueu els estudiants que tinguin un nom més llarg de 13 caràcters
db.students.find({
  $expr: { //Permite usar expresiones de agregación
    $gt: [
      { $strLenCP: "$firstname" }, //calcula la longitud en caracteres de un string
      13
    ]
  }
})

//22. Busqueu els estudiants que tinguin un nom amb més de 3 vocals
db.students.find(
    {firstname: /.[aeiouAEIOU].[aeiouAEIOU].[aeiouAEIOU].[aeiouAEIOU].*/}
    //. — Cualquier carácter (excepto salto de línea).
    //[aeiouAEIOU] — Una vocal (mayúscula o minúscula).
    //.* — Cero o más caracteres cualesquiera.
)

//23. Busqueu els estudiants que tinguin un dni que comenci per lletra
db.students.find(
    {dni: {$regex: /^[a-z]/, $options: 'i'}}
)


//24. Busqueu els estudiants que tinguin un dni que comenci i acabi per lletra
db.students.find(
    {dni: {$regex: /^[a-z].*[a-z]$/, $options: 'i'}} //Indica que el elemento anterior (en este caso el .) puede repetirse cero o más veces.
)

//25. Busqueu els estudiants que tinguin telèfon que comenci per 622
db.students.find(
    {phone: {$regex: /^622/}}
)