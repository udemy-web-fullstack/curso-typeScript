// Type Predicate em Generics (tipo predicado)

// export function isNumber(value: unknown): boolean {
export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function soma<T>(...args: T[]): number {
  const devolve = args.reduce((sum, value) => {
    if (isNumber(sum) && isNumber(value)) {
      return sum + value;
    }
    return sum;
  }, 0);

  return devolve;
}

console.log(soma(2, 4, 6));
console.log(soma('M', 'a', 'g', 'n', 'o'));

// TS atual: a inferência de T em (...args: T[]) é mais restritiva.
// A união (string | number) nem sempre é inferida automaticamente.
console.log(soma(...[2, 4, 6, 'M', 'a', 'g', 'n', 'o', 2]));
