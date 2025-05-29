# Guía de MongoDB para Examen

## Índice
- [1. Consultas Básicas con `find`](#1-consultas-básicas-con-find)
- [2. Consultas con `findOne`](#2-consultas-con-findone)
- [3. Operadores de Comparación](#3-operadores-de-comparación)
- [4. Operadores Lógicos](#4-operadores-lógicos)
- [5. Operadores de Elemento](#5-operadores-de-elemento)
- [6. Operadores de Evaluación](#6-operadores-de-evaluación)
- [7. Operadores de Actualización](#7-operadores-de-actualización)
- [8. Operador `$mod`](#8-operador-mod)
- [9. Consultas con Arrays](#9-consultas-con-arrays)
- [10. Consultas con Subdocumentos](#10-consultas-con-subdocumentos)
- [11. Ordenación y Restricciones](#11-ordenación-y-restricciones)
- [12. Inserción de Datos](#12-inserción-de-datos)
- [13. Eliminación de Datos](#13-eliminación-de-datos)
- [14. Actualización de Datos](#14-actualización-de-datos)
- [15. Operaciones de Agregación](#15-operaciones-de-agregación)

## 1. Consultas Básicas con `find`
**Explicación**: Busca documentos en una colección. Puede incluir filtros (consulta) y proyección (campos a mostrar). Sin parámetros, muestra los primeros 20 documentos. Usa `.pretty()` para un formato legible.

**Ejemplo**:
```javascript
db.people.find({ age: 34, isActive: true }, { name: 1, age: 1, isActive: 1, _id: 0 }).pretty()
```
**Resultado**:
```javascript
{ "name": "Lauren Hailey", "age": 34, "isActive": true }
```

## 2. Consultas con `findOne`
**Explicación**: Similar a `find`, pero retorna solo el primer documento que cumple los criterios. No soporta `.pretty()`.

**Ejemplo**:
```javascript
db.people.findOne({ age: 34, isActive: true }, { name: 1, age: 1, isActive: 1, _id: 0 })
```
**Resultado**:
```javascript
{ "name": "Lauren Hailey", "age": 34, "isActive": true }
```

## 3. Operadores de Comparación
**Explicación**: Permiten filtrar documentos según condiciones específicas (igualdad, mayor que, etc.).

| Operador | Descripción | Ejemplo |
|----------|-------------|---------|
| `$eq` | Igual a | `db.people.find({ age: { $eq: 34 } }, { name: 1, _id: 0 })` → `{ "name": "Lauren Hailey" }` |
| `$ne` | Distinto de | `db.people.find({ age: { $ne: 34 } }, { name: 1, _id: 0 })` → `{ "name": "Addison Sheldon" }, { "name": "Morgan Cook" }` |
| `$gt` | Mayor que | `db.people.find({ age: { $gt: 30 } }, { name: 1, _id: 0 })` → `{ "name": "Lauren Hailey" }, { "name": "Morgan Cook" }` |
| `$gte` | Mayor o igual | `db.people.find({ age: { $gte: 34 } }, { name: 1, _id: 0 })` → `{ "name": "Lauren Hailey" }, { "name": "Morgan Cook" }` |
| `$lt` | Menor que | `db.people.find({ age: { $lt: 30 } }, { name: 1, _id: 0 })` → `{ "name": "Addison Sheldon" }` |
| `$lte` | Menor o igual | `db.people.find({ age: { $lte: 28 } }, { name: 1, _id: 0 })` → `{ "name": "Addison Sheldon" }` |
| `$in` | En una lista | `db.people.find({ name: { $in: ["Lauren Hailey", "Morgan Cook"] } }, { name: 1, _id: 0 })` → `{ "name": "Lauren Hailey" }, { "name": "Morgan Cook" }` |
| `$nin` | No en una lista | `db.people.find({ name: { $nin: ["Lauren Hailey"] } }, { name: 1, _id: 0 })` → `{ "name": "Addison Sheldon" }, { "name": "Morgan Cook" }` |

## 4. Operadores Lógicos
**Explicación**: Combinan múltiples condiciones para filtrar documentos.

**Ejemplo ($and)**:
```javascript
db.people.find({ $and: [{ name: "Lauren Hailey" }, { company: "Safetrust" }] }, { name: 1, company: 1, _id: 0 }).pretty()
```
**Resultado**:
```javascript
{ "name": "Lauren Hailey", "company": "Safetrust" }
```

**Ejemplo ($or)**:
```javascript
db.people.find({ $or: [{ name: "Addison Sheldon" }, { name: "Morgan Cook" }] }, { name: 1, _id: 0 }).pretty()
```
**Resultado**:
```javascript
{ "name": "Addison Sheldon" }
{ "name": "Morgan Cook" }
```

**Ejemplo ($nor)**:
```javascript
db.people.find({ $nor: [{ age: 34 }, { age: 28 }] }, { name: 1, _id: 0 }).pretty()
```
**Resultado**:
```javascript
{ "name": "Morgan Cook" }
```

**Ejemplo ($not)**:
```javascript
db.people.find({ age: { $not: { $gt: 30 } } }, { name: 1, _id: 0 }).pretty()
```
**Resultado**:
```javascript
{ "name": "Addison Sheldon" }
```

## 5. Operadores de Elemento
**Explicación**: Verifican la existencia o el tipo de un campo.

**Ejemplo ($exists)**:
```javascript
db.people.find({ company: { $exists: true } }, { name: 1, company: 1, _id: 0 }).pretty()
```
**Resultado**:
```javascript
{ "name": "Lauren Hailey", "company": "Safetrust" }
{ "name": "Addison Sheldon", "company": "TechCorp" }
{ "name": "Morgan Cook", "company": "DataInc" }
```

**Ejemplo ($type)**:
```javascript
db.people.find({ company: { $type: "string" } }, { name: 1, company: 1, _id: 0 }).pretty()
```
**Resultado**:
```javascript
{ "name": "Lauren Hailey", "company": "Safetrust" }
{ "name": "Addison Sheldon", "company": "TechCorp" }
{ "name": "Morgan Cook", "company": "DataInc" }
```

## 6. Operadores de Evaluación
**Explicación**: Permiten búsquedas avanzadas como expresiones regulares o comparaciones entre campos.

**Ejemplo ($regex)**:
```javascript
db.people.find({ name: { $regex: "Hailey", $options: "i" } }, { name: 1, _id: 0 }).pretty()
```
**Resultado**:
```javascript
{ "name": "Lauren Hailey" }
```

**Ejemplo ($expr)**:
```javascript
db.people.find({ $expr: { $gt: ["$age", 30] } }, { name: 1, age: 1, _id: 0 }).pretty()
```
**Resultado**:
```javascript
{ "name": "Lauren Hailey", "age": 34 }
{ "name": "Morgan Cook", "age": 40 }
```

## 7. Operadores de Actualización
**Explicación**: Modifican documentos existentes en la colección.

| **Operador**     | **Descripción**                                                                 | **Ejemplo** |
|------------------|----------------------------------------------------------------------------------|-------------|
| `$set`           | Establece un valor específico en un campo                                       | `db.people.updateOne({ name: "Lauren Hailey" }, { $set: { age: 35 } })` |
| `$unset`         | Elimina un campo del documento                                                   | `db.people.updateOne({ name: "Lauren Hailey" }, { $unset: { company: "" } })` |
| `$inc`           | Incrementa un valor numérico                                                     | `db.people.updateOne({ name: "Lauren Hailey" }, { $inc: { age: 1 } })` |
| `$mul`           | Multiplica un valor numérico                                                     | `db.people.updateOne({ name: "Lauren Hailey" }, { $mul: { age: 2 } })` |
| `$rename`        | Renombra un campo                                                                | `db.people.updateOne({ name: "Lauren Hailey" }, { $rename: { company: "empresa" } })` |
| `$push`          | Añade un elemento al final de un array                                           | `db.people.updateOne({ name: "Lauren Hailey" }, { $push: { tags: "nuevo" } })` |
| `$pop`           | Elimina el primer (`-1`) o último (`1`) elemento de un array                     | `db.people.updateOne({ name: "Lauren Hailey" }, { $pop: { tags: 1 } })` |
| `$pull`          | Elimina elementos que coincidan con el valor dado en un array                    | `db.people.updateOne({ name: "Lauren Hailey" }, { $pull: { tags: "sunt" } })` |
| `$addToSet`      | Añade un valor a un array solo si no está presente                               | `db.people.updateOne({ name: "Lauren Hailey" }, { $addToSet: { tags: "nuevo" } })` |
| `$each`          | Se usa junto con `$push` o `$addToSet` para insertar múltiples elementos         | `db.people.updateOne({ name: "Lauren Hailey" }, { $push: { tags: { $each: ["a", "b"] } } })` |
| `$position`      | Define la posición en la que insertar un elemento con `$push`                    | `db.people.updateOne({ name: "Lauren Hailey" }, { $push: { tags: { $each: ["x"], $position: 0 } } })` |
| `$slice`         | Se usa con `$push` para limitar el tamaño del array resultante                   | `db.people.updateOne({ name: "Lauren Hailey" }, { $push: { tags: { $each: ["nuevo"], $slice: -3 } } })` |
| `$sort`          | Se usa con `$push` para ordenar elementos al agregarlos                          | `db.people.updateOne({ name: "Lauren Hailey" }, { $push: { tags: { $each: ["b", "a"], $sort: 1 } } })` |


## 8. Operador `$mod`
**Explicación**: Verifica si un número es divisible por otro, útil para pares/impares.

**Ejemplo (números pares)**:
```javascript
db.people.find({ age: { $mod: [2, 0] } }, { name: 1, age: 1, _id: 0 }).pretty()
```
**Resultado**:
```javascript
{ "name": "Lauren Hailey", "age": 34 }
{ "name": "Addison Sheldon", "age": 28 }
{ "name": "Morgan Cook", "age": 40 }
```

**Ejemplo (números impares)**:
```javascript
db.people.find({ age: { $mod: [2, 1] } }, { name: 1, age: 1, _id: 0 }).pretty()
```
**Resultado**: (ninguno, ya que no hay edades impares en el ejemplo)

## 9. Consultas con Arrays
**Explicación**: Filtran documentos basados en elementos de un array usando `$all`, `$in` o `$slice`.

**Ejemplo ($all)**:
```javascript
db.people.find({ tags: { $all: ["laborum", "sunt"] } }, { name: 1, tags: 1, _id: 0 }).pretty()
```
**Resultado**:
```javascript
{ "name": "Lauren Hailey", "tags": ["laborum", "sunt"] }
```

**Ejemplo ($in)**:
```javascript
db.people.find({ tags: { $in: ["laborum", "sunt", "nisi"] } }, { name: 1, tags: 1, _id: 0 }).pretty()
```
**Resultado**:
```javascript
{ "name": "Lauren Hailey", "tags": ["laborum", "sunt"] }
{ "name": "Addison Sheldon", "tags": ["enim", "sunt"] }
{ "name": "Morgan Cook", "tags": ["laborum", "nisi"] }
```

**Ejemplo ($slice)**:
```javascript
db.people.find({ tags: { $in: ["laborum"] } }, { tags: { $slice: [2, 3] }, name: 1, _id: 0 }).pretty()
```
**Resultado**: (muestra elementos desde el índice 2, hasta 3 elementos si existen)

## 10. Consultas con Subdocumentos
**Explicación**: Buscan documentos basados en subdocumentos o campos específicos usando notación de puntos.

**Ejemplo (subdocumento completo)**:
```javascript
db.people.find({ friends: { id: 1, name: "Trinity Ford" } }, { name: 1, friends: 1, _id: 0 }).pretty()
```
**Resultado**:
```javascript
{ "name": "Lauren Hailey", "friends": [{ "id": 1, "name": "Trinity Ford" }] }
```

**Ejemplo (notación de puntos)**:
```javascript
db.people.find({ "friends.name": "Trinity Ford" }, { name: 1, friends: 1, _id: 0 }).pretty()
```
**Resultado**:
```javascript
{ "name": "Lauren Hailey", "friends": [{ "id": 1, "name": "Trinity Ford" }] }
```

## 11. Ordenación y Restricciones
**Explicación**: Ordena resultados (`sort`), limita resultados (`limit`) o salta documentos (`skip`).

**Ejemplo (sort)**:
```javascript
db.people.find({ isActive: true }, { name: 1, _id: 0 }).sort({ name: 1 }).pretty()
```
**Resultado**:
```javascript
{ "name": "Lauren Hailey" }
{ "name": "Morgan Cook" }
```

**Ejemplo (limit y skip)**:
```javascript
db.people.find({ isActive: true }, { name: 1, _id: 0 }).skip(1).limit(1).pretty()
```
**Resultado**:
```javascript
{ "name": "Morgan Cook" }
```

## 12. Inserción de Datos
**Explicación**: Inserta documentos con `insertOne`, `insertMany` o `save`.

**Ejemplo (insertOne)**:
```javascript
db.people.insertOne({ name: "John Doe", age: 30, isActive: true })
```

**Ejemplo (insertMany)**:
```javascript
db.people.insertMany([
  { name: "Jane Smith", age: 25 },
  { name: "Bob Johnson", age: 45 }
])
```

## 13. Eliminación de Datos
**Explicación**: Elimina documentos con `deleteOne` o `deleteMany`.

**Ejemplo**:
```javascript
db.people.deleteOne({ name: "Lauren Hailey" })
db.people.deleteMany({ isActive: false })
```

## 14. Actualización de Datos
**Explicación**: Actualiza documentos con `updateOne`, `updateMany` o `upsert`.

**Ejemplo**:
```javascript
db.people.updateOne({ name: "Morgan Cook" }, { $set: { age: 41 } })
db.people.updateMany({ isActive: true }, { $push: { tags: "active" } })
```

## 15. Operaciones de Agregación
**Explicación**: Combina documentos para calcular resultados agrupados (ej. sumas, conteos).

**Ejemplo**:
```javascript
db.people.aggregate([
  { $group: { _id: "$company", num_people: { $sum: 1 } } }
])
```
**Resultado**:
```javascript
{ "_id": "Safetrust", "num_people": 1 }
{ "_id": "TechCorp", "num_people": 1 }
{ "_id": "DataInc", "num_people": 1 }
```

## Notas
- **Proyección**: Usa `1` para mostrar campos, `0` para excluirlos. `_id` se muestra por defecto a menos que se excluya.
- **Case-Sensitive en `$regex`**: Usa `$options: "i"` para búsquedas insensibles a mayúsculas.
- **Documentación Oficial**: [MongoDB Documentation](https://www.mongodb.com/docs/)
