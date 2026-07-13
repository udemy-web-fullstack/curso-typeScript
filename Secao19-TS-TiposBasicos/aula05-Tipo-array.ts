// Array<T> - T[]

export function multiplicaArgs(...args: Array<number>): number {
  return args.reduce((acumula, valor) => acumula * valor, 3);
}

export function concatenaString(...args: string[]): string {
  return args.reduce((ac, valor) => ac + valor);
}

export function toUpperCase(...args: string[]): string[] {
  return args.map((valor) => valor.toUpperCase());
}

const concatenacao = concatenaString('a', 'b', 'c');
const result = multiplicaArgs(1, 2, 3);
const upper = toUpperCase('a', 'b', 'c');

console.log(result);
console.log(concatenacao);
console.log(upper);





