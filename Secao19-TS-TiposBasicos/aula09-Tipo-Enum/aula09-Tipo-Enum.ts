enum Cores1 {
  VERMELHO = 10, // 10
  AZUL = 100, // 100
  AMARELO = 2000, // 2000
}
enum Cores2 {
  VERMELHO, // 0
  AZUL, // 1
  AMARELO, // 2
}

enum Cores1 {
  ROXO = 'ROXO',
  VERDE = 201,
  ROSA,
}

console.log(Cores1, '\n');
console.log(Cores2, '\n');
console.log(Cores2.AZUL, '\n');
console.log(Cores2[1], '\n');


export function escolhaACor(cor: Cores1): void {
  console.log(Cores1[cor]);
}

escolhaACor(Cores1.VERDE);

