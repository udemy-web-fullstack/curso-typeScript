// Array e Promisses em generics
type MeuTipo = number;

const arrayNum: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(arrayNum);

async function promiseAsync() {
  return 1;
}

function minhaPromise(): Promise<MeuTipo> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
}

promiseAsync().then((resultado) => console.log(resultado + 1));
minhaPromise().then((resultado) => console.log(resultado + 1));
