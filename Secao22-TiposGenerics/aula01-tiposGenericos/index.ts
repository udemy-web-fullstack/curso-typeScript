// ****** AQUI com types generics ******

type FiltroCallback<U> = (
  value: U,
  // value: unknown, unknown[], AQUI entra o 'U' de tipo
  index?: number,
  array?: U[],
  // array?: unknown[], unknown[], AQUI entra o 'U' de tipo
) => boolean;

export function MeuFiltro<T>(
  array: T[],
  // array: unknown[], AQUI entra o 'T' de tipo
  callbackfn: FiltroCallback<T>,
): T[] {
  const novoArray = [];

  for (let i = 0; i < array.length; i++) {
    if (callbackfn(array[i])) {
      novoArray.push(array[i]);
    }
  }
  return novoArray;
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const arrayFiltradoOriginal = array.filter((value) => value <= 5);
console.log(arrayFiltradoOriginal);

const arrayFitrado = MeuFiltro(array, (value) => value <= 5);
console.log(arrayFitrado);

// ****** AQUI sem types generics ******

/*
type FiltroCallback = (
  value: unknown,
  index?: number,
  array?: unknown[],
) => boolean;

export function MeuFiltro(
  array: unknown[],
  callbackfn: FiltroCallback,
): unknown[] {
  const novoArray = [];

  for (let i = 0; i < array.length; i++) {
    if (callbackfn(array[i])) {
      novoArray.push(array[i]);
    }
  }
  return novoArray;
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const arrayFiltradoOriginal = array.filter((value) => value <= 5);
console.log(arrayFiltradoOriginal);

const arrayFitrado = MeuFiltro(array, (value) => {
  if (typeof value === 'number') return value <= 5;
  return false;
});
console.log(arrayFitrado);
*/
