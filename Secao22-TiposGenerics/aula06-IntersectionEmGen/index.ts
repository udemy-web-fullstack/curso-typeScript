// Generics com intersection
// *************** USANDO "ASSIGN ***************

export function unirObjetos<T, U>(obj1: T, obj2: U): T & U {
  return Object.assign({}, obj1, obj2);
}

const obj1 = { chave1: 'Magno' };
const obj2 = { chave2: 'V Gomes' };

const unir = unirObjetos(obj1, obj2);
console.log(unir);

/* *************** USANDO "SPREAD" ***************

export function unirObjetos<O1, O2>(obj1: O1, obj2: O2): O1 & O2 {
  return { ...obj1, ...obj2 };
}

const obj1 = { chave1: 'Magno' };
const obj2 = { chave2: 'V Gomes' };

const unir = unirObjetos(obj1, obj2);
console.log(unir);
*/
