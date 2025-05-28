# Guía de Expresiones Regulares ($regex) en MongoDB

Esta guía cubre los conceptos clave sobre el uso de expresiones regulares (`$regex`) en MongoDB, diseñada como un recurso para exámenes. Incluye explicaciones breves y ejemplos prácticos basados en una colección `people` con documentos como:

```javascript
[
  { "_id": 1, "name": "Lauren Hailey", "company": "Safetrust", "tags": ["laborum", "sunt"] },
  { "_id": 2, "name": "Addison Sheldon", "company": "TechCorp", "tags": ["enim", "sunt"] },
  { "_id": 3, "name": "Morgan Cook", "company": "DataInc", "tags": ["laborum", "nisi"] }
]
```

## Índice
- [1. Búsqueda Básica de Subcadenas](#1-búsqueda-básica-de-subcadenas)
- [2. Búsqueda Case-Insensitive](#2-búsqueda-case-insensitive)
- [3. Búsqueda con Anclaje de Inicio (^)](#3-búsqueda-con-anclaje-de-inicio-)
- [4. Búsqueda con Anclaje de Fin ($)](#4-búsqueda-con-anclaje-de-fin-)
- [5. Búsqueda en Arrays](#5-búsqueda-en-arrays)
- [6. Búsqueda con Múltiples Patrones ($in)](#6-búsqueda-con-múltiples-patrones-in)
- [7. Búsqueda Multilínea](#7-búsqueda-multilínea)
- [8. Búsqueda con Caracteres Especiales](#8-búsqueda-con-caracteres-especiales)
- [9. Uso de $regexMatch en Agregaciones](#9-uso-de-regexmatch-en-agregaciones)
- [10. Combinación con Operadores Lógicos](#10-combinación-con-operadores-lógicos)
- [11. Uso con Proyección](#11-uso-con-proyección)
- [12. Optimización con Índices](#12-optimización-con-índices)

## 1. Búsqueda Básica de Subcadenas
**Explicación**: Busca documentos donde un campo contiene una subcadena específica, sensible a mayúsculas por defecto.

**Ejemplo**:
```javascript
db.people.find({ name: { $regex: "Hailey" } }, { name: 1, _id: 0 })
```
**Resultado**:
```javascript
{ "name": "Lauren Hailey" }
```

## 2. Búsqueda Case-Insensitive
**Explicación**: Usa la opción `i` para buscar sin distinguir entre mayúsculas y minúsculas.

**Ejemplo**:
```javascript
db.people.find({ name: { $regex: "hailey", $options: "i" } }, { name: 1, _id: 0 })
```
**Resultado**:
```javascript
{ "name": "Lauren Hailey" }
```

## 3. Búsqueda con Anclaje de Inicio (^)
**Explicación**: Usa `^` para buscar documentos donde el campo comienza con un patrón específico.

**Ejemplo**:
```javascript
db.people.find({ name: { $regex: "^Add" } }, { name: 1, _id: 0 })
```
**Resultado**:
```javascript
{ "name": "Addison Sheldon" }
```

## 4. Búsqueda con Anclaje de Fin ($)
**Explicación**: Usa `$` para buscar documentos donde el campo termina con un patrón específico.

**Ejemplo**:
```javascript
db.people.find({ name: { $regex: "Cook$" } }, { name: 1, _id: 0 })
```
**Resultado**:
```javascript
{ "name": "Morgan Cook" }
```

## 5. Búsqueda en Arrays
**Explicación**: Busca documentos donde un campo de tipo array contiene un elemento que coincide con el patrón.

**Ejemplo**:
```javascript
db.people.find({ tags: { $regex: "laborum" } }, { name: 1, tags: 1, _id: 0 })
```
**Resultado**:
```javascript
{ "name": "Lauren Hailey", "tags": ["laborum", "sunt"] }
{ "name": "Morgan Cook", "tags": ["laborum", "nisi"] }
```

## 6. Búsqueda con Múltiples Patrones ($in)
**Explicación**: Usa `$in` con objetos de expresión regular para buscar documentos que coincidan con múltiples patrones.

**Ejemplo**:
```javascript
db.people.find({ name: { $in: [/^Add/, /Cook$/] } }, { name: 1, _id: 0 })
```
**Resultado**:
```javascript
{ "name": "Addison Sheldon" }
{ "name": "Morgan Cook" }
```

## 7. Búsqueda Multilínea
**Explicación**: Usa la opción `m` para que `^` y `$` coincidan con el inicio/fin de cada línea en campos multilínea.

**Ejemplo** (Suponiendo un campo `bio` con texto multilínea):
```javascript
db.people.find({ bio: { $regex: "^Tech", $options: "m" } }, { name: 1, bio: 1, _id: 0 })
```
**Resultado**: Documentos con líneas en `bio` que comiencen con "Tech".

## 8. Búsqueda con Caracteres Especiales
**Explicación**: Escapa caracteres especiales (ej. `.`, `*`) con `\` para buscarlos literalmente.

**Ejemplo** (Suponiendo un campo `description` con "Tech.Inc"):
```javascript
db.people.find({ description: { $regex: "Tech\\.Inc" } }, { name: 1, description: 1, _id: 0 })
```
**Resultado**:
```javascript
{ "name": "Addison Sheldon", "description": "Tech.Inc" }
```

## 9. Uso de $regexMatch en Agregaciones
**Explicación**: Usa `$regexMatch` en pipelines de agregación para filtrar documentos según un patrón.

**Ejemplo**:
```javascript
db.people.aggregate([
  {
    $match: {
      $expr: { $regexMatch: { input: "$name", regex: "Hailey", options: "i" } }
    }
  },
  { $project: { name: 1, _id: 0 } }
])
```
**Resultado**:
```javascript
{ "name": "Lauren Hailey" }
```

## 10. Combinación con Operadores Lógicos
**Explicación**: Combina `$regex` con `$and`, `$or`, `$not` para consultas más complejas.

**Ejemplo**:
```javascript
db.people.find(
  {
    $and: [
      { name: { $regex: "Hailey", $options: "i" } },
      { company: "Safetrust" }
    ]
  },
  { name: 1, company: 1, _id: 0 }
)
```
**Resultado**:
```javascript
{ "name": "Lauren Hailey", "company": "Safetrust" }
```

## 11. Uso con Proyección
**Explicación**: Limita los campos devueltos en los resultados de `$regex` usando proyección.

**Ejemplo**:
```javascript
db.people.find(
  { name: { $regex: "Sheldon$" } },
  { name: 1, _id: 0 }
)
```
**Resultado**:
```javascript
{ "name": "Addison Sheldon" }
```

## 12. Optimización con Índices
**Explicación**: `$regex` puede usar índices si el patrón es un prefijo (`^`). Crear un índice mejora el rendimiento.

**Ejemplo**:
```javascript
db.people.createIndex({ name: 1 }) // Crear índice
db.people.find({ name: { $regex: "^Laur" } }, { name: 1, _id: 0 })
```
**Resultado**:
```javascript
{ "name": "Lauren Hailey" }
```

## Notas
- **Case-Sensitive por Defecto**: Usa `$options: "i"` para búsquedas insensibles a mayúsculas.
- **Índices y Prefijos**: Las búsquedas con `^` son más rápidas si hay un índice en el campo.
- **Documentación Oficial**: [MongoDB $regex](https://www.mongodb.com/docs/manual/reference/operator/query/regex/)