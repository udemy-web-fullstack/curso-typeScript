// Encadeamento opcional e Operador Coalescência nula
type Documento = {
  titulo: string;
  texto: string;
  data?: Date;
};

const documento: Documento = {
  titulo: 'Aprendendo TypeScript',
  texto: 'texto para iniciantes',
  // data: new Date(),
};

console.log(documento.data?.toDateString() ?? 'Eita, a data não existe.');

// console.log(documento);
// console.log(documento.data?.toDateString());
// console.log(undefined ?? 'Eita, continua com a data não existe.');
// console.log(null ?? 'Eita, continua com a data não existe pela terceira vez.');
// console.log(false ?? 'Eita, a data não existe.');
// console.log(0 ?? 'Eita, a data não existe.');
// console.log('' ?? 'Eita, a data não existe.');
